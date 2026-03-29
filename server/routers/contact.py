# server/routers/contact.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
import sqlalchemy as sa

from database import get_db

router = APIRouter(prefix="/api/contacts", tags=["Contacts"])

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@router.post("")
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    try:
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
        return {"message": "Message sent successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@router.get("")
def get_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        records = db.execute(
            sa.text("""
                SELECT id, name, email, subject, message 
                FROM contacts 
                OFFSET :skip LIMIT :limit
            """),
            {"skip": skip, "limit": limit}
        ).mappings().all() 

        return records

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@router.get("/")
def get_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        records = db.execute(
            sa.text("""
                SELECT id, name, email, subject, message, status 
                FROM contacts 
                ORDER BY id DESC
                OFFSET :skip LIMIT :limit
            """),
            {"skip": skip, "limit": limit}
        ).mappings().all() 
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@router.patch("/{contact_id}/status")
def update_contact_status(contact_id: int, db: Session = Depends(get_db)):
    try:
        db.execute(
            sa.text("UPDATE contacts SET status = 'Replied' WHERE id = :id"),
            {"id": contact_id}
        )
        db.commit()
        return {"message": "Status updated to Replied"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    try:
        db.execute(
            sa.text("DELETE FROM contacts WHERE id = :id"),
            {"id": contact_id}
        )
        db.commit()
        return {"message": "Message deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))