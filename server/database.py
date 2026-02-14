from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, BatteryRecord

app = FastAPI()

# --------------------------------------------------
# Database Dependency
# --------------------------------------------------
# This function handles opening and closing the database connection for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --------------------------------------------------
# Pydantic Schema
# --------------------------------------------------
# Defines the structure of the data expected from the frontend/client
class BatteryInput(BaseModel):
    voltage: float
    temperature: float
    soh_result: float = 95.5

# --------------------------------------------------
# CRUD Routes
# --------------------------------------------------

# CREATE: Insert a new battery record into the database
@app.post("/records/")
def create_record(data: BatteryInput, db: Session = Depends(get_db)):
    # Map the incoming JSON data to the SQLAlchemy Model
    new_record = BatteryRecord(
        voltage=data.voltage, 
        temperature=data.temperature, 
        soh_result=data.soh_result
    )
    db.add(new_record)      # Add to session
    db.commit()             # Save to database
    db.refresh(new_record)  # Get the generated ID
    return new_record

# READ: Fetch all battery records from the database
@app.get("/records/")
def read_records(db: Session = Depends(get_db)):
    return db.query(BatteryRecord).all()

#  UPDATE: Modify an existing record based on its ID
@app.put("/records/{record_id}")
def update_record(record_id: int, data: BatteryInput, db: Session = Depends(get_db)):
    # Find the record by ID
    record = db.query(BatteryRecord).filter(BatteryRecord.id == record_id).first()
    
    # If record doesn't exist, return a 404 error
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    # Update the fields
    record.voltage = data.voltage
    record.temperature = data.temperature
    
    db.commit()             # Save changes
    return {"message": "Updated successfully"}

# DELETE: Remove a specific record from the database
@app.delete("/records/{record_id}")
def delete_record(record_id: int, db: Session = Depends(get_db)):
    # Search for the record
    record = db.query(BatteryRecord).filter(BatteryRecord.id == record_id).first()
    
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    db.delete(record)       # Delete the record
    db.commit()             # Confirm the deletion
    return {"message": "Deleted successfully"}