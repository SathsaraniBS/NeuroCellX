from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ml_engine.predictor import predict_battery

router = APIRouter(
    prefix="/api/ml",
    tags=["ML Battery Prediction"]
)

class BatteryPredictionInput(BaseModel):
    model_name: str
    voltage: float
    current: float
    temperature: float
    cycle: float
    capacity: float
    duration: float

@router.post("/predict")
def predict_ev_battery(data: BatteryPredictionInput):
    try:
        input_values = [
            data.voltage,
            data.current,
            data.temperature,
            data.cycle,
            data.capacity,
            data.duration,
        ]

        result = predict_battery(data.model_name, input_values)
        return {
            "success": True,
            "data": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))