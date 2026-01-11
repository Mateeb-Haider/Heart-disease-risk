import pickle
import numpy as np
import pandas as pd
from pathlib import Path
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Dil Sehat API", version="1.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
MODEL_PATH = Path(__file__).parent / "heart_model.pkl"
model = None

try:
    if MODEL_PATH.exists():
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        print("Model loaded successfully")
    else:
        print("Warning: Model file not found")
except Exception as e:
    print(f"Error loading model: {e}")

class HeartData(BaseModel):
    age: int
    sex: str
    trestbps: int
    chol: int
    thalach: int
    oldpeak: float
    cp: str
    restecg: str
    fbs: str
    exang: str
    slope: str

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}

@app.post("/predict")
def predict(data: HeartData):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    # Mirror the logic from app.py
    sex_n = 1 if data.sex == "Male" else 0
    fbs_n = 1 if data.fbs == "Yes" else 0
    exang_n = 1 if data.exang == "Yes" else 0

    cp_ATA = 1 if data.cp == "ATA" else 0
    cp_NAP = 1 if data.cp == "NAP" else 0
    cp_ASY = 1 if data.cp == "ASY" else 0

    restecg_ST = 1 if data.restecg == "ST" else 0
    restecg_LVH = 1 if data.restecg == "LVH" else 0

    slope_Flat = 1 if data.slope == "Flat" else 0
    slope_Down = 1 if data.slope == "Down" else 0

    input_data = np.array([[
        data.age, sex_n, data.trestbps, data.chol, fbs_n,
        data.thalach, exang_n, data.oldpeak,
        cp_ATA, cp_NAP, cp_ASY,
        restecg_ST, restecg_LVH,
        slope_Flat, slope_Down
    ]])

    try:
        prediction = int(model.predict(input_data)[0])
        probability = 0.0
        if hasattr(model, "predict_proba"):
            probability = float(model.predict_proba(input_data)[0][1] * 100)

        return {
            "risk_detected": bool(prediction == 1),
            "probability": probability,
            "message": "High Risk" if prediction == 1 else "Low Risk"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
