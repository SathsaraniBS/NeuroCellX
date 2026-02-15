# server/main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

# Import database setup and utilities
from database import engine, Base, SessionLocal, get_db

# Import your SQLAlchemy model (defined in database.py or models.py)
from database import BatteryRecord    # ← Make sure this matches your actual model class name

app = FastAPI(title="EV Battery Health Prediction System")

# Add CORS middleware – allows React/Vite frontend (localhost:5173) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*"               # ← Use "*" only during early development – tighten later!
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Automatically create all tables defined in models (Base.metadata)
# → Good for development / quick prototyping
# → In production: prefer Alembic migrations
Base.metadata.create_all(bind=engine)

# Pydantic model for request body validation
class BatteryInput(BaseModel):
    voltage: float
    temperature: float

@app.get("/")
def home():
    """Simple health-check endpoint"""
    return {"message": "EV Battery Health Backend is Running! (using SQLAlchemy)"}

@app.post("/predict-dummy")
def predict_dummy(data: BatteryInput, db: Session = Depends(get_db)):
    """
    Dummy prediction endpoint:
    - Receives voltage & temperature
    - Returns fake SOH (State of Health)
    - Saves the record to PostgreSQL using SQLAlchemy
    """
    try:
        # Replace this with your real ML model prediction later
        predicted_soh = 95.5

        # Create new database record
        new_record = BatteryRecord(
            voltage=data.voltage,
            temperature=data.temperature,
            soh_result=predicted_soh
        )

        db.add(new_record)
        db.commit()
        db.refresh(new_record)  # ← Loads the inserted ID and any server-generated fields

        return {
            "status": "success",
            "predicted_soh": predicted_soh,
            "saved_record_id": new_record.id,
            "message": "Data successfully saved to PostgreSQL (via SQLAlchemy)"
        }

    except Exception as e:
        db.rollback()           # ← Important: rollback on error to avoid partial changes
        raise HTTPException(
            status_code=500,
            detail=f"Server error: {str(e)}"
        )