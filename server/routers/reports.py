# server/routers/reports.py
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel
from typing import Optional
from database import get_db
from datetime import datetime
import jwt
import os

router = APIRouter(prefix="/api/reports", tags=["Reports"])

# 
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")  

def get_current_user_id(authorization: Optional[str] = Header(None)) -> Optional[int]:
    """
    Authorization: Decodes user_id from Bearer <token> header.Authorization: Decodes user_id from Bearer <token> header.Returns None if token is not present (not required)
    """
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        
        return payload.get("id") or payload.get("user_id") or payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")



# Schemas
class ReportCreate(BaseModel):
    report_name:   str
    report_type:   Optional[str]   = "Battery Health Report"
    battery_id:    Optional[str]   = None
    soh_predicted: Optional[float] = None
    rul_predicted: Optional[float] = None
    voltage:       Optional[float] = None
    current_a:     Optional[float] = None
    temperature:   Optional[float] = None
    cycle_count:   Optional[float] = None   
    capacity:      Optional[float] = None
    health_status: Optional[str]   = None


class ReportUpdate(BaseModel):
    report_name: str
    battery_id:  Optional[str] = None




@router.post("/")
def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)

    try:
        db.execute(
            text("""
                INSERT INTO reports (
                    report_name, report_type, battery_id,
                    soh_predicted, rul_predicted,
                    voltage, current_a, temperature,
                    cycle_count, capacity, health_status,
                    generated_by
                ) VALUES (
                    :report_name, :report_type, :battery_id,
                    :soh_predicted, :rul_predicted,
                    :voltage, :current_a, :temperature,
                    :cycle_count, :capacity, :health_status,
                    :generated_by
                )
            """),
            {
                "report_name":   report.report_name,
                "report_type":   report.report_type,
                "battery_id":    report.battery_id,
                "soh_predicted": report.soh_predicted,
                "rul_predicted": report.rul_predicted,
                "voltage":       report.voltage,
                "current_a":     report.current_a,
                "temperature":   report.temperature,
                "cycle_count":   report.cycle_count,
                "capacity":      report.capacity,
                "health_status": report.health_status,
                "generated_by":  user_id,        
            }
        )
        db.commit()
        return {"status": "success", "message": "Report created successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    try:
        reports = db.execute(
            text("""
                SELECT
                    r.id, r.report_name, r.report_type,
                    r.battery_id, r.soh_predicted, r.rul_predicted,
                    r.voltage, r.current_a, r.temperature,
                    r.cycle_count, r.capacity, r.health_status,
                    r.created_at,
                    u.name AS generated_by_name
                FROM reports r
                LEFT JOIN users u ON r.generated_by = u.id
                ORDER BY r.created_at DESC
            """)
        ).fetchall()

        return {
            "status":  "success",
            "count":   len(reports),
            "reports": [dict(r._mapping) for r in reports],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{report_id}")
def get_report(report_id: int, db: Session = Depends(get_db)):
    try:
        report = db.execute(
            text("""
                SELECT r.*, u.name AS generated_by_name
                FROM reports r
                LEFT JOIN users u ON r.generated_by = u.id
                WHERE r.id = :id
            """),
            {"id": report_id}
        ).fetchone()

        if not report:
            raise HTTPException(status_code=404, detail="Report not found")

        return {"status": "success", "report": dict(report._mapping)}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{report_id}")
def update_report(
    report_id: int,
    report: ReportUpdate,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)

    try:
        existing = db.execute(
            text("SELECT 1 FROM reports WHERE id = :id"),
            {"id": report_id}
        ).scalar()

        if not existing:
            raise HTTPException(status_code=404, detail="Report not found")

        db.execute(
            text("""
                UPDATE reports
                SET report_name = :report_name,
                    battery_id  = :battery_id
                WHERE id = :id
            """),
            {
                "report_name": report.report_name,
                "battery_id":  report.battery_id,
                "id":          report_id,
            }
        )
        db.commit()
        return {"status": "success", "message": "Report updated successfully"}

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    try:
        existing = db.execute(
            text("SELECT 1 FROM reports WHERE id = :id"),
            {"id": report_id}
        ).scalar()

        if not existing:
            raise HTTPException(status_code=404, detail="Report not found")

        db.execute(
            text("DELETE FROM reports WHERE id = :id"),
            {"id": report_id}
        )
        db.commit()
        return {"status": "success", "message": "Report deleted"}

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))