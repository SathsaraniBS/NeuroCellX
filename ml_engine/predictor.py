import os
import json
import joblib
import numpy as np
from tensorflow.keras.models import load_model

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATHS = {
    "random_forest": {
        "type": "sklearn",
        "folder": "random_forest",
        "soh": "voltiq_rf_soh_model.joblib",
        "rul": "voltiq_rf_rul_model.joblib",
        "scaler": "voltiq_rf_feature_scaler.joblib",
        "metrics": "voltiq_rf_metrics.json",
    },
    "svr": {
        "type": "sklearn",
        "folder": "svr",
        "soh": "voltiq_svr_soh_model.joblib",
        "rul": "voltiq_svr_rul_model.joblib",
        "scaler": "voltiq_svr_feature_scaler.joblib",
        "metrics": "voltiq_svr_metrics.json",
    },
    "naive_bayes": {
        "type": "sklearn",
        "folder": "naive_bayes",
        "soh": "voltiq_nb_soh_model.joblib",
        "rul": "voltiq_nb_rul_model.joblib",
        "scaler": "voltiq_nb_feature_scaler.joblib",
        "metrics": "voltiq_nb_metrics.json",
    },
    "grv_randomforest": {
        "type": "sklearn",
        "folder": "grv+randomforest",
        "soh": "voltiq_grv_rf_soh_model.joblib",
        "rul": "voltiq_grv_rf_rul_model.joblib",
        "scaler": "voltiq_grv_rf_feature_scaler.joblib",
        "metrics": "voltiq_grv_rf_metrics.json",
    },
    "lstm_transformer": {
        "type": "keras",
        "folder": "lstm+transformer",
        "soh": "soh_model.keras",
        "rul": "rul_model.keras",
        "scaler": "feature_scaler.joblib",
        "metrics": "metrics.json",
    },
}


def load_metrics(folder, metrics_file):
    path = os.path.join(BASE_DIR, folder, metrics_file)
    with open(path, "r") as f:
        return json.load(f)


def predict_battery(model_name, input_values):
    if model_name not in MODEL_PATHS:
        raise ValueError("Invalid model name")

    config = MODEL_PATHS[model_name]
    folder_path = os.path.join(BASE_DIR, config["folder"])

    scaler = joblib.load(os.path.join(folder_path, config["scaler"]))
    metrics = load_metrics(config["folder"], config["metrics"])

    x = np.array([input_values], dtype=float)
    x_scaled = scaler.transform(x)

    if config["type"] == "sklearn":
        soh_model = joblib.load(os.path.join(folder_path, config["soh"]))
        rul_model = joblib.load(os.path.join(folder_path, config["rul"]))

        soh = float(soh_model.predict(x_scaled)[0])
        rul = float(rul_model.predict(x_scaled)[0])

    else:
        soh_model = load_model(os.path.join(folder_path, config["soh"]))
        rul_model = load_model(os.path.join(folder_path, config["rul"]))

        x_lstm = x_scaled.reshape((x_scaled.shape[0], 1, x_scaled.shape[1]))

        soh = float(soh_model.predict(x_lstm)[0][0])
        rul = float(rul_model.predict(x_lstm)[0][0])

    return {
        "model": model_name,
        "soh": round(soh, 4),
        "rul": round(rul, 2),
        "metrics": metrics
    }