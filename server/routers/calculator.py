# routers/calculator.py

from fastapi import APIRouter
import requests

router = APIRouter()

EXCHANGE_RATE_API_URL = "https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD"

@router.get("/calculate")
def get_ev_data(battery_kwh: float, charger_kw: float, country_code: str):
    local_rate = 4.0 
    currency = "INR"

    charging_time = battery_kwh / charger_kw

    total_cost_local = battery_kwh * local_rate

    return {
        "charging_time_hours": round(charging_time, 2),
        "total_cost": round(total_cost_local, 2),
        "currency": currency
    }

@router.get("/exchange-rates")
def get_rates():
    try:
        response = requests.get(EXCHANGE_RATE_API_URL)
        response.raise_for_status() 
        return response.json()["conversion_rates"]
    except Exception as e:
        return {"error": f"API Error: {str(e)}"}