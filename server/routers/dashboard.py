# server/routers/dashboard.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import sqlalchemy as sa

from database import get_db


router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/battery-logs")
def get_battery_logs(db: Session = Depends(get_db)):
    logs = db.execute(
        sa.text("""
            SELECT id, voltage, temperature, soh_result, created_at 
            FROM battery_logs 
            ORDER BY created_at DESC 
            LIMIT 20
        """)
    ).fetchall()

    return {"logs": [dict(log) for log in logs]}