from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import io

from ml.predict import predict, MODEL_REGISTRY

app = FastAPI(
    title="Marine Species Classifier",
    description="Classifies endangered marine species using multiple models.",
    version="2.0.0",
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VALID_MODELS = list(MODEL_REGISTRY.keys())
DEFAULT_MODEL = "efficientnetv2"


class PredictionResponse(BaseModel):
    class_label: str
    confidence: float
    model_used: str


@app.get("/")
def root():
    return {"status": "ok", "models": VALID_MODELS}


@app.post("/predict", response_model=PredictionResponse)
async def predict_species(
    file: UploadFile = File(...),
    model: str = Query(DEFAULT_MODEL),
):
    if model not in VALID_MODELS:
        raise HTTPException(status_code=400, detail="Invalid model")

    contents = await file.read()

    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except:
        raise HTTPException(status_code=400, detail="Invalid image")

    label, confidence = predict(image, model_name=model)

    return {
        "class_label": label,
        "confidence": confidence,
        "model_used": model,
    }