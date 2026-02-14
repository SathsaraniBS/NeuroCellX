from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import SessionLocal, engine, Base, BatteryRecord

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class BatteryInput(BaseModel):
    voltage: float
    temperature: float

# Home Route
@app.get("/")
def home():
    return {"message": "EV Battery Health Backend is Running!"}

@app.post("/predict-dummy")
def predict_dummy(data: BatteryInput, db: Session = Depends(get_db)):
    try:
        predicted_soh = 95.5

        new_record = BatteryRecord(
            voltage=data.voltage,
            temperature=data.temperature,
            soh_result=predicted_soh
        )

        db.add(new_record)
        db.commit()
        db.refresh(new_record)

        return {
            "status": "Success",
            "predicted_soh": predicted_soh,
            "saved_id": new_record.id,
            "message": "Data saved to PostgreSQL!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))