import torch
from torchvision import transforms
from PIL import Image

IMG_SIZE = 224

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]

_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
])


def preprocess_image(image: Image.Image) -> torch.Tensor:
    """
    Preprocess image for model inference
    """
    if image.mode != "RGB":
        image = image.convert("RGB")

    tensor = _transform(image)
    return tensor.unsqueeze(0)  # shape: (1, 3, 224, 224)