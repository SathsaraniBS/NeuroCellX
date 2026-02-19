# server/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from passlib.context import CryptContext
import sqlalchemy as sa

from database import get_db

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    # Password length check (bcrypt limit 72 bytes)
    if len(user.password.encode('utf-8')) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password too long (maximum 72 bytes)"
        )
    
    try:
        # Check if email already exists
        existing = db.execute(
            sa.text("SELECT 1 FROM users WHERE email = :email"),
            {"email": user.email}
        ).scalar()

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        hashed_password = pwd_context.hash(user.password)

        db.execute(
            sa.text("""
                INSERT INTO users (name, email, password, role)
                VALUES (:name, :email, :password, 'user')
            """),
            {"name": user.name, "email": user.email, "password": hashed_password}
        )
        db.commit()

        return {"message": "User registered successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.execute(
        sa.text("""
            SELECT id, name, email, password, role 
            FROM users 
            WHERE email = :email
        """),
        {"email": user.email}
    ).fetchone()

    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    return {
        "message": "Login successful",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "role": db_user.role
        }
    }