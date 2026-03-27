# server/routers/contact.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
import sqlalchemy as sa

from database import get_db

# FIX: Matched the prefix pattern used in auth.py ("/api/...")
router = APIRouter(prefix="/api/contacts", tags=["Contacts"])

# FIX: Moved the Pydantic schema into the file to match auth.py style
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@router.post("/")
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    try:
        # FIX: Replaced ORM (db.add) with Raw SQL (sa.text) to match auth.py
        db.execute(
            sa.text("""
                INSERT INTO contacts (name, email, subject, message)
                VALUES (:name, :email, :subject, :message)
            """),
            {
                "name": contact.name, 
                "email": contact.email, 
                "subject": contact.subject, 
                "message": contact.message
            }
        )
        db.commit()

        # FIX: Returning a simple success dictionary instead of an ORM object
        return {"message": "Message sent successfully"}

    except Exception as e:
        # FIX: Added db.rollback() and 500 error handling identical to auth.py
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@router.get("/")
def get_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        # FIX: Replaced db.query(Contact).all() with Raw SQL
        records = db.execute(
            sa.text("""
                SELECT id, name, email, subject, message 
                FROM contacts 
                OFFSET :skip LIMIT :limit
            """),
            {"skip": skip, "limit": limit}
        ).mappings().all() 

        # .mappings().all() converts the SQL rows directly into a list of dictionaries
        return records

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")