import os
import joblib
import numpy as np
from fastapi import APIRouter

# TensorFlow is essential for Deep Learning (LSTM/Transformer)
try:
    import tensorflow as tf
except ImportError:
    tf = None
    print("⚠️ Warning: TensorFlow not found. LSTM and Hybrid models will not work.")

router = APIRouter(
    prefix="/api/ml",
    tags=["Prediction"]
)

# Setting up basic paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_ROOT = os.path.join(BASE_DIR, "models")

# A dictionary to store all models
models = {}

def load_all_models():
    """Loading all ML and DL models into the system (Step 1 & 4)"""
    try:
        # 1. Random Forest
        models['random_forest'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_scaler.pkl"))
        }

        # 2. Naive Bayes
        models['naive_bayes'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_rul_model.pkl"))
        }

        # 3. SVR
        models['svr'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_scaler.pkl"))
        }

        # 4. GRU + Random Forest Hybrid
        models['gru_randomforest'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_feat_scaler.pkl"))
        }

        # 5. LSTM + Transformer (Step 4: Loading with TensorFlow)
        if tf:
            models['lstm_transformer'] = {
                'soh': tf.keras.models.load_model(os.path.join(MODELS_ROOT, "lstm+transformer", "soh_model (3).keras")),
                'rul': tf.keras.models.load_model(os.path.join(MODELS_ROOT, "lstm+transformer", "rul_model (3).keras")),
                'scaler': joblib.load(os.path.join(MODELS_ROOT, "lstm+transformer", "feature_scaler (3).joblib"))
            }

        print(" Success: All 5 ML/DL models loaded successfully!")
    except Exception as e:
        print(f" Error loading models: {e}")

# Load the model at server startup
load_all_models()

@router.post("/predict")
async def predict(data: dict):
    # Getting the Model Key sent from the frontend
    model_key = data.get('model_key', 'random_forest')
    
    try:
        # Creating the input features list
        input_features = [
            float(data.get('Capacity', 0.0)),
            float(data.get('Voltage', 0.0)),   
            float(data.get('Current', 0.0)),   
            float(data.get('Temperature', 0.0)), 
            float(data.get('CycleCount', 0.0))  
        ]
        
        current_model = models.get(model_key)
        if not current_model:
            return {"status": "error", "message": f"Model '{model_key}' is not loaded."}

        # --- Step 4: Deep Learning / Hybrid Logic (3D Reshaping) ---
        if model_key in ['lstm_transformer', 'grv_randomforest']:
            # 1. Data Scaling
            scaled_input = current_model['scaler'].transform([input_features])
            
            # 2. Rotate to 3D Shape (Samples, Time Steps, Features) -> (1, 1, 5)
            reshaped_input = scaled_input.reshape((1, 1, 5))
            
            # 3. Getting Prediction
            soh_pred = current_model['soh'].predict(reshaped_input, verbose=0)
            rul_pred = current_model['rul'].predict(reshaped_input, verbose=0)
            
            # In Deep Learning, the prediction comes as [[value]], so get the first value.
            soh_final = float(soh_pred[0][0]) if isinstance(soh_pred, np.ndarray) else float(soh_pred)
            rul_final = float(rul_pred[0][0]) if isinstance(rul_pred, np.ndarray) else float(rul_pred)

        # --- Logic for other ML models (RF, SVR, NB) ---
        else:
            if 'scaler' in current_model:
                scaled_input = current_model['scaler'].transform([input_features])
                soh_final = current_model['soh'].predict(scaled_input)[0]
                rul_final = current_model['rul'].predict(scaled_input)[0]
            else:
                # For models without a scaler (Naive Bayes)
                soh_final = current_model['soh'].predict([input_features])[0]
                rul_final = current_model['rul'].predict([input_features])[0]

        return {
            "status": "success",
            "predictions": {
                "SOH": round(float(soh_final), 2),
                "RUL": round(float(rul_final), 2)
            }
        }
        
    except Exception as e:
        print(f" Prediction Error ({model_key}): {e}")
        return {"status": "error", "message": str(e)}