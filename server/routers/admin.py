# backend/routers/admin.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from typing import Optional
from database import get_db

router = APIRouter(prefix="/api/admin", tags=["Admin"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "user"

class UserUpdate(BaseModel):
    name:   Optional[str] = None
    role:   Optional[str] = None
    status: Optional[str] = None

# GET /api/admin/stats
# System overview stats
@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    try:
        # Total users
        total_users = db.execute(
            text("SELECT COUNT(*) FROM users")
        ).scalar()

        # Users by role
        admin_count = db.execute(
            text("SELECT COUNT(*) FROM users WHERE role = 'admin'")
        ).scalar()

        engineer_count = db.execute(
            text("SELECT COUNT(*) FROM users WHERE role = 'engineer'")
        ).scalar()

        analyst_count = db.execute(
            text("SELECT COUNT(*) FROM users WHERE role = 'analyst'")
        ).scalar()

        # Total battery logs
        total_logs = db.execute(
            text("SELECT COUNT(*) FROM battery_logs")
        ).scalar()

        return {
            "status":          "success",
            "total_users":     total_users,
            "admin_count":     admin_count,
            "engineer_count":  engineer_count,
            "analyst_count":   analyst_count,
            "total_logs":      total_logs,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# GET /api/admin/users
# Get all users
@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    try:
        users = db.execute(
            text("""
                SELECT id, name, email, role, created_at
                FROM users
                ORDER BY id DESC
            """)
        ).fetchall()

        return {
            "status": "success",
            "users": [dict(u._mapping) for u in users]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# POST /api/admin/users
# Add new user

@router.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Check email exists
        existing = db.execute(
            text("SELECT 1 FROM users WHERE email = :email"),
            {"email": user.email}
        ).scalar()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        hashed = pwd_context.hash(user.password)

        db.execute(
            text("""
                INSERT INTO users (name, email, password, role)
                VALUES (:name, :email, :password, :role)
            """),
            {
                "name":     user.name,
                "email":    user.email,
                "password": hashed,
                "role":     user.role
            }
        )
        db.commit()

        return {"status": "success", "message": "User created successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# PUT /api/admin/users/{user_id}
# Update user role
@router.put("/users/{user_id}")
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    try:
        # Check user exists
        existing = db.execute(
            text("SELECT 1 FROM users WHERE id = :id"),
            {"id": user_id}
        ).scalar()

        if not existing:
            raise HTTPException(status_code=404, detail="User not found")

        # Update role if provided
        if user.role:
            db.execute(
                text("UPDATE users SET role = :role WHERE id = :id"),
                {"role": user.role, "id": user_id}
            )

        # Update name if provided
        if user.name:
            db.execute(
                text("UPDATE users SET name = :name WHERE id = :id"),
                {"name": user.name, "id": user_id}
            )

        db.commit()
        return {"status": "success", "message": "User updated successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# DELETE /api/admin/users/{user_id}
# Delete user
@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    try:
        existing = db.execute(
            text("SELECT 1 FROM users WHERE id = :id"),
            {"id": user_id}
        ).scalar()

        if not existing:
            raise HTTPException(status_code=404, detail="User not found")

        db.execute(
            text("DELETE FROM users WHERE id = :id"),
            {"id": user_id}
        )
        db.commit()

        return {"status": "success", "message": "User deleted successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))