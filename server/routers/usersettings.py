# server/routers/settings.py
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from typing import Optional
from pydantic import BaseModel, EmailStr
from jose import jwt, JWTError
from passlib.context import CryptContext
import json

router = APIRouter(prefix="/api/settings", tags=["Settings"])

SECRET_KEY = "voltiq-secret-key-change-in-production"
ALGORITHM  = "HS256"
pwd_ctx    = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ─────────────────────────────────────────────────────────────
#  Auth Helper
# ─────────────────────────────────────────────────────────────
def get_current_user_id(authorization: Optional[str] = Header(None)) -> int:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return int(user_id)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ─────────────────────────────────────────────────────────────
#  Create user_settings table if not exists
# ─────────────────────────────────────────────────────────────
def ensure_settings_table(db: Session):
    try:
        db.execute(text("""
            CREATE TABLE IF NOT EXISTS user_settings (
                id                      SERIAL PRIMARY KEY,
                user_id                 INTEGER UNIQUE NOT NULL,
                soh_critical_threshold  FLOAT   DEFAULT 75.0,
                soh_warning_threshold   FLOAT   DEFAULT 85.0,
                rul_warning_threshold   INTEGER DEFAULT 20,
                default_model           VARCHAR(50) DEFAULT 'random_forest',
                items_per_page          INTEGER DEFAULT 8,
                critical_alerts_email   BOOLEAN DEFAULT FALSE,
                critical_alerts_push    BOOLEAN DEFAULT TRUE,
                alert_threshold         FLOAT   DEFAULT 75.0,
                language                VARCHAR(20) DEFAULT 'en',
                date_format             VARCHAR(20) DEFAULT 'MM/DD/YYYY',
                created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """))
        db.commit()
    except Exception as e:
        print(f"Settings table: {e}")
        db.rollback()

# ─────────────────────────────────────────────────────────────
#  Schemas
# ─────────────────────────────────────────────────────────────
class ProfileUpdate(BaseModel):
    name:  Optional[str]       = None
    email: Optional[str]       = None

class PasswordChange(BaseModel):
    current_password: str
    new_password:     str

class DashboardPrefs(BaseModel):
    soh_critical_threshold: Optional[float]   = None
    soh_warning_threshold:  Optional[float]   = None
    rul_warning_threshold:  Optional[int]     = None
    default_model:          Optional[str]     = None
    items_per_page:         Optional[int]     = None

class NotificationPrefs(BaseModel):
    critical_alerts_email: Optional[bool]  = None
    critical_alerts_push:  Optional[bool]  = None
    alert_threshold:       Optional[float] = None

class DisplayPrefs(BaseModel):
    language:    Optional[str] = None
    date_format: Optional[str] = None

# ─────────────────────────────────────────────────────────────
#  GET /api/settings/profile
# ─────────────────────────────────────────────────────────────
@router.get("/profile")
def get_profile(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)
    try:
        user = db.execute(
            text("SELECT id, name, email, role, created_at FROM users WHERE id = :uid"),
            {"uid": user_id}
        ).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        m = user._mapping
        return {
            "status": "success",
            "user": {
                "id":         m["id"],
                "name":       m["name"],
                "email":      m["email"],
                "role":       m["role"],
                "created_at": str(m["created_at"]),
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ─────────────────────────────────────────────────────────────
#  PUT /api/settings/profile
# ─────────────────────────────────────────────────────────────
@router.put("/profile")
def update_profile(
    body: ProfileUpdate,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)
    try:
        updates = {}
        if body.name  is not None: updates["name"]  = body.name.strip()
        if body.email is not None: updates["email"] = body.email.strip().lower()

        if not updates:
            return {"status": "success", "message": "Nothing to update"}

        # Check email duplicate
        if "email" in updates:
            existing = db.execute(
                text("SELECT id FROM users WHERE email = :email AND id != :uid"),
                {"email": updates["email"], "uid": user_id}
            ).fetchone()
            if existing:
                raise HTTPException(status_code=400, detail="Email already in use")

        set_clause = ", ".join([f"{k} = :{k}" for k in updates])
        updates["uid"] = user_id
        db.execute(text(f"UPDATE users SET {set_clause} WHERE id = :uid"), updates)
        db.commit()

        return {"status": "success", "message": "Profile updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# ─────────────────────────────────────────────────────────────
#  PUT /api/settings/password
# ─────────────────────────────────────────────────────────────
@router.put("/password")
def change_password(
    body: PasswordChange,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)
    try:
        user = db.execute(
            text("SELECT password_hash FROM users WHERE id = :uid"),
            {"uid": user_id}
        ).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Verify current password
        if not pwd_ctx.verify(body.current_password, user._mapping["password_hash"]):
            raise HTTPException(status_code=400, detail="Current password is incorrect")

        # Validate new password
        if len(body.new_password) < 8:
            raise HTTPException(status_code=400, detail="New password must be at least 8 characters")

        new_hash = pwd_ctx.hash(body.new_password)
        db.execute(
            text("UPDATE users SET password_hash = :hash WHERE id = :uid"),
            {"hash": new_hash, "uid": user_id}
        )
        db.commit()
        return {"status": "success", "message": "Password changed successfully"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# ─────────────────────────────────────────────────────────────
#  GET /api/settings/preferences
# ─────────────────────────────────────────────────────────────
@router.get("/preferences")
def get_preferences(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)
    ensure_settings_table(db)
    try:
        prefs = db.execute(
            text("SELECT * FROM user_settings WHERE user_id = :uid"),
            {"uid": user_id}
        ).fetchone()

        if not prefs:
            # Return defaults
            return {
                "status": "success",
                "preferences": {
                    "soh_critical_threshold": 75.0,
                    "soh_warning_threshold":  85.0,
                    "rul_warning_threshold":  20,
                    "default_model":          "random_forest",
                    "items_per_page":         8,
                    "critical_alerts_email":  False,
                    "critical_alerts_push":   True,
                    "alert_threshold":        75.0,
                    "language":               "en",
                    "date_format":            "MM/DD/YYYY",
                }
            }

        m = prefs._mapping
        return {
            "status": "success",
            "preferences": {
                "soh_critical_threshold": m["soh_critical_threshold"],
                "soh_warning_threshold":  m["soh_warning_threshold"],
                "rul_warning_threshold":  m["rul_warning_threshold"],
                "default_model":          m["default_model"],
                "items_per_page":         m["items_per_page"],
                "critical_alerts_email":  m["critical_alerts_email"],
                "critical_alerts_push":   m["critical_alerts_push"],
                "alert_threshold":        m["alert_threshold"],
                "language":               m["language"],
                "date_format":            m["date_format"],
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ─────────────────────────────────────────────────────────────
#  PUT /api/settings/preferences — Save all preferences
# ─────────────────────────────────────────────────────────────
class AllPreferences(BaseModel):
    soh_critical_threshold: Optional[float] = None
    soh_warning_threshold:  Optional[float] = None
    rul_warning_threshold:  Optional[int]   = None
    default_model:          Optional[str]   = None
    items_per_page:         Optional[int]   = None
    critical_alerts_email:  Optional[bool]  = None
    critical_alerts_push:   Optional[bool]  = None
    alert_threshold:        Optional[float] = None
    language:               Optional[str]   = None
    date_format:            Optional[str]   = None

@router.put("/preferences")
def save_preferences(
    body: AllPreferences,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)
    ensure_settings_table(db)
    try:
        existing = db.execute(
            text("SELECT id FROM user_settings WHERE user_id = :uid"),
            {"uid": user_id}
        ).fetchone()

        fields = body.dict(exclude_none=True)
        if not fields:
            return {"status": "success", "message": "Nothing to update"}

        if existing:
            set_clause = ", ".join([f"{k} = :{k}" for k in fields])
            set_clause += ", updated_at = CURRENT_TIMESTAMP"
            fields["uid"] = user_id
            db.execute(text(f"UPDATE user_settings SET {set_clause} WHERE user_id = :uid"), fields)
        else:
            fields["user_id"] = user_id
            cols   = ", ".join(fields.keys())
            vals   = ", ".join([f":{k}" for k in fields.keys()])
            db.execute(text(f"INSERT INTO user_settings ({cols}) VALUES ({vals})"), fields)

        db.commit()
        return {"status": "success", "message": "Preferences saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# ─────────────────────────────────────────────────────────────
#  GET /api/settings/export-data — Export user data
# ─────────────────────────────────────────────────────────────
@router.get("/export-data")
def export_user_data(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)
    try:
        user = db.execute(
            text("SELECT id, name, email, role, created_at FROM users WHERE id = :uid"),
            {"uid": user_id}
        ).fetchone()

        reports = db.execute(
            text("SELECT * FROM reports WHERE generated_by = :uid ORDER BY created_at DESC"),
            {"uid": user_id}
        ).fetchall()

        evals = db.execute(
            text("SELECT * FROM evaluation_results WHERE user_id = :uid ORDER BY created_at DESC"),
            {"uid": user_id}
        ).fetchall() if db.execute(text("SELECT to_regclass('evaluation_results')")).scalar() else []

        export = {
            "exported_at": str(__import__('datetime').datetime.utcnow()),
            "user":    dict(user._mapping) if user else {},
            "reports": [dict(r._mapping) for r in reports],
            "evaluations": [dict(e._mapping) for e in evals],
        }

        return {"status": "success", "data": export}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ─────────────────────────────────────────────────────────────
#  DELETE /api/settings/account — Delete account
# ─────────────────────────────────────────────────────────────
class DeleteAccount(BaseModel):
    password: str
    confirm:  str  # must be "DELETE"

@router.delete("/account")
def delete_account(
    body: DeleteAccount,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)

    if body.confirm != "DELETE":
        raise HTTPException(status_code=400, detail="Please type DELETE to confirm")

    try:
        user = db.execute(
            text("SELECT password_hash FROM users WHERE id = :uid"),
            {"uid": user_id}
        ).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if not pwd_ctx.verify(body.password, user._mapping["password_hash"]):
            raise HTTPException(status_code=400, detail="Incorrect password")

        # Delete related data
        db.execute(text("DELETE FROM reports WHERE generated_by = :uid"),         {"uid": user_id})
        db.execute(text("DELETE FROM user_settings WHERE user_id = :uid"),        {"uid": user_id})
        try:
            db.execute(text("DELETE FROM evaluation_results WHERE user_id = :uid"), {"uid": user_id})
        except: pass
        db.execute(text("DELETE FROM users WHERE id = :uid"),                      {"uid": user_id})
        db.commit()

        return {"status": "success", "message": "Account deleted"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))