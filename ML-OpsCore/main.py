from typing import List
from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib

app = FastAPI(title="ML Prediction Service")

MODEL_PATH = Path("models") / "model.joblib"
model = None


class PredictRequest(BaseModel):
    # For the provided RandomForest trained on Iris, we expect 4 floats.
    features: List[float] = Field(..., min_length=4, max_length=4)


class PredictResponse(BaseModel):
    predicted_class: int
    probabilities: List[float]


@app.on_event("startup")
def load_model():
    global model
    if not MODEL_PATH.exists():
        raise RuntimeError(f"Model file not found at {MODEL_PATH}. Please run training or include the model artifact.")
    model = joblib.load(MODEL_PATH)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    # convert to 2D array for sklearn
    X = [req.features]
    try:
        probs = model.predict_proba(X)[0].tolist()
        pred = int(model.predict(X)[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return PredictResponse(predicted_class=pred, probabilities=probs)
