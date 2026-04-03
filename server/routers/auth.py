# server/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field, EmailStr
from passlib.context import CryptContext
from jose import jwt                          
from datetime import datetime, timedelta      
import sqlalchemy as sa
                        

from database import get_db

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Settings                             
SECRET_KEY = "voltiq-secret-key-change-in-production"  
ALGORITHM = "HS256"                                     
TOKEN_EXPIRE_HOURS = 24                                 

def create_token(user_id: int, email: str, role: str): 
    payload = {
        "sub": str(user_id),
        "email": email,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=TOKEN_EXPIRE_HOURS)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr 
    password: str = Field(..., min_length=6, max_length=72)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    new_password: str = Field(..., min_length=6, max_length=72)

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        existing = db.execute(
            sa.text("SELECT 1 FROM users WHERE email = :email"),
            {"email": user.email}
        ).scalar()

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        safe_password = user.password[:72]
        hashed_password = pwd_context.hash(safe_password)

        db.execute(
            sa.text("""
                INSERT INTO users (name, email, password, role)
                VALUES (:name, :email, :password, 'user')
            """),
            {"name": user.name, "email": user.email, "password": hashed_password}
        )
        db.commit()

        return {"message": "User registered successfully"}

    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

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

    if not db_user or not pwd_context.verify(user.password[:72], db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    

    token = create_token(
        user_id=db_user.id,
        email=db_user.email,
        role=db_user.role
    )

    
    return {
        "message": "Login successful",
        "token": token,               
        "user": {
            "id":    db_user.id,
            "name":  db_user.name,
            "email": db_user.email,
            "role":  db_user.role
        }
    }

@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.execute(
        sa.text("SELECT id FROM users WHERE email = :email"),
        {"email": request.email}
    ).fetchone()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email does not exist"
        )

    
    return {
        "message": f"Password reset instructions have been sent to {request.email}"
    }

@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.execute(
        sa.text("SELECT id FROM users WHERE email = :email"),
        {"email": request.email}
    ).fetchone()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email does not exist"
        )
        
    hashed_password = pwd_context.hash(request.new_password)
    
    db.execute(
        sa.text("UPDATE users SET password = :password WHERE email = :email"),
        {"password": hashed_password, "email": request.email}
    )
    db.commit()

    return {"message": "Password has been reset successfully"}