import os
import torch
import torch.nn.functional as F
from PIL import Image
from typing import Tuple

from ml.preprocess import preprocess_image
from ml.model_architecture import get_model

# -----------------------------
# DEVICE
# -----------------------------
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# -----------------------------
# CLASS LABELS (28)
# -----------------------------
CLASS_NAMES = [
    "Oceanic giant manta ray",
    "Reef manta ray (Mobula alfredi)",
    "Blacktip reef shark",
    "Blue shark",
    "Bull shark",
    "Great white shark",
    "Hammerhead shark",
    "Oceanic whitetip shark",
    "Shortfin mako shark",
    "Thresher shark",
    "Tiger shark",
    "Whale shark",
    "Atlantic spotted dolphin",
    "Bottlenose dolphin",
    "Common dolphin",
    "Hector’s dolphin",
    "Irrawaddy dolphin",
    "Pacific white-sided dolphin",
    "Risso’s dolphin",
    "Rough-toothed dolphin",
    "Spinner dolphin",
    "Flatback sea turtle",
    "Green sea turtle",
    "Hawksbill sea turtle",
    "Kemp’s ridley sea turtle",
    "Leatherback sea turtle",
    "Loggerhead sea turtle",
    "Olive ridley sea turtle"
]

NUM_CLASSES = len(CLASS_NAMES)

# -----------------------------
# MODEL PATHS (SAFE)
# -----------------------------
BASE_DIR = os.path.dirname(__file__)

MODEL_REGISTRY = {
    "vit": os.path.join(BASE_DIR, "marine_vit_final.pth"),
    "efficientnetv2": os.path.join(BASE_DIR, "marine_efficientnetv2_final.pth"),
}

# -----------------------------
# CACHE
# -----------------------------
_model_cache = {}


# -----------------------------
# LOAD MODEL
# -----------------------------
def _load_model(model_name: str):
    if model_name not in MODEL_REGISTRY:
        raise ValueError(f"Unknown model: {model_name}")

    # Return cached
    if model_name in _model_cache:
        return _model_cache[model_name]

    weights_path = MODEL_REGISTRY[model_name]

    if not os.path.exists(weights_path):
        raise FileNotFoundError(f"Model not found: {weights_path}")

    # Build architecture
    model = get_model(model_name, num_classes=NUM_CLASSES, pretrained=False)

    # 🔥 PyTorch 2.6 fix
    checkpoint = torch.load(
        weights_path,
        map_location=DEVICE,
        weights_only=False
    )

    # Handle different formats
    if isinstance(checkpoint, dict):
        if "state_dict" in checkpoint:
            state_dict = checkpoint["state_dict"]
        elif "model" in checkpoint:
            state_dict = checkpoint["model"]
        else:
            state_dict = checkpoint
    else:
        state_dict = checkpoint

    # 🔥 Flexible loading (avoids head mismatch crash)
    model.load_state_dict(state_dict, strict=False)

    model.to(DEVICE)
    model.eval()

    _model_cache[model_name] = model
    return model


# -----------------------------
# PREDICT FUNCTION
# -----------------------------
def predict(image: Image.Image, model_name: str) -> Tuple[str, float]:
    model = _load_model(model_name)

    tensor = preprocess_image(image).to(DEVICE)

    with torch.no_grad():
        logits = model(tensor)
        probs = F.softmax(logits, dim=1).squeeze(0)

    confidence, idx = probs.max(dim=0)
    label = CLASS_NAMES[idx.item()]

    return label, round(confidence.item(), 4)
