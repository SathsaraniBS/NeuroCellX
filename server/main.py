from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

# Import database items
from database import SessionLocal, engine, Base, BatteryRecord

# Create tables automatically
Base.metadata.create_all(bind=engine)

# --------------------------------------------------
# Create FastAPI app
# --------------------------------------------------
app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Database Dependency (VERY IMPORTANT)
# --------------------------------------------------
# This creates and closes DB session automatically
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# Request Schema (for clean JSON input)
# --------------------------------------------------
class BatteryInput(BaseModel):
    voltage: float
    temperature: float


# --------------------------------------------------
# Routes
# --------------------------------------------------

# Home route
@app.get("/")
def home():
    return {"message": "EV Battery Health Backend is Running!"}


# Prediction endpoint + Save to DB
@app.post("/predict-dummy")
def predict_dummy(data: BatteryInput, db: Session = Depends(get_db)):

    # Dummy ML prediction (replace later with real model)
    predicted_soh = 95.5

    # Create database record
    record = BatteryRecord(
        voltage=data.voltage,
        temperature=data.temperature,
        soh_result=predicted_soh
    )

    # Save to database
    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "status": "Success",
        "predicted_soh": predicted_soh,
        "saved_id": record.id
    }