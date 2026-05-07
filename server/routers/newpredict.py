import os
import joblib
import numpy as np
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/ml",
    tags=["Prediction"]
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "models", "RandomForest")

try:
    scaler = joblib.load(os.path.join(MODEL_DIR, "rf_5feat_scaler.pkl"))
    soh_model = joblib.load(os.path.join(MODEL_DIR, "rf_5feat_soh_model.pkl"))
    rul_model = joblib.load(os.path.join(MODEL_DIR, "rf_5feat_rul_model.pkl"))
    print(" Models loaded successfully!")
except Exception as e:
    print(f" Error loading models: {e}")
    scaler = None
    soh_model = None
    rul_model = None

@router.post("/predict")
async def predict(data: dict):
    if not all([scaler, soh_model, rul_model]):
        return {"status": "error", "message": "Models are not loaded properly on the server."}

    print("\nDEBUG: Incoming Data ->", data)

    try:
        input_features = [
            float(data.get('Capacity', 0.0)),
            float(data.get('Voltage', 0.0)),   
            float(data.get('Current', 0.0)),   
            float(data.get('Temperature', 0.0)), 
            float(data.get('CycleCount', 0.0))  
        ]
        
        print("DEBUG: Final Feature List ->", input_features)
        
        scaled_input = scaler.transform([input_features])
        
        soh_prediction = soh_model.predict(scaled_input)[0]
        rul_prediction = rul_model.predict(scaled_input)[0]
        
        return {
            "status": "success",
            "predictions": {
                "SOH": round(float(soh_prediction), 2),
                "RUL": round(float(rul_prediction), 2)
            }
        }
        
    except Exception as e:
        print(f" Prediction Error: {e}")
        return {"status": "error", "message": str(e)}