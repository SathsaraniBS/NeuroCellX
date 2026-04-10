# server/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.chatbot import router as chatbot_router  

from routers import auth
from routers import dashboard
from database import engine, Base
from routers import admin 
from routers import datasets 
from routers import contact     
from routers import predict      


app = FastAPI(
    title="VoltIQ - EV Battery Health Prediction System",
    description="AI-powered EV battery SOH, SOC and RUL prediction API",
    version="1.0.0"
)

EXCHANGE_RATE_API_URL = "https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD"

# CORS Middleware
# Allows React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",      #  Vite React dev server
        "http://127.0.0.1:5173",      #  alternate localhost
    ],                                #  FIXED: removed "*" - conflicts with credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(admin.router)  
app.include_router(datasets.router) 
app.include_router(predict.router) 
app.include_router(contact.router)
app.include_router(chatbot_router, prefix="/api")

# Create all database tables on startup
Base.metadata.create_all(bind=engine)  

# Health Check
# GET /
@app.get("/")
def home():
    return {                           # FIXED: removed broken get_db() call
        "message": "VoltIQ - EV Battery Health Backend is Running!",
        "status": "online",
        "version": "1.0.0"
    }

@app.get("/")
def root():
    return {"message": "VoltIQ API Running!"}


@app.get("/calculate")
def get_ev_data(battery_kwh: float, charger_kw: float, country_code: str):
    # 1. Fetch electricity rate from your DB (Mocking here for brevity)
    # rate = db.query(ElectricityRate).filter(...) 
    local_rate = 4.0  # e.g., 4 units
    currency = "INR"

    # 2. Logic for Charging Time
    charging_time = battery_kwh / charger_kw

    # 3. Logic for Cost
    total_cost_local = battery_kwh * local_rate

    return {
        "charging_time_hours": round(charging_time, 2),
        "total_cost": round(total_cost_local, 2),
        "currency": currency
    }

@app.get("/exchange-rates")
def get_rates():
    # Fetch real-time rates to allow users to toggle between currencies
    response = requests.get(EXCHANGE_RATE_API_URL)
    return response.json()["conversion_rates"]