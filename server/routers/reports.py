# server/routers/reports.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel
from typing import Optional
from database import get_db
from datetime import datetime

router = APIRouter(prefix="/api/reports", tags=["Reports"])

# ─────────────────────────────────────────
# Schema
# ─────────────────────────────────────────
class ReportCreate(BaseModel):
    report_name:   str
    report_type:   Optional[str] = "Battery Health Report"
    battery_id:    Optional[str] = "B0006"
    soh_predicted: Optional[float] = None
    rul_predicted: Optional[float] = None
    voltage:       Optional[float] = None
    current_a:     Optional[float] = None
    temperature:   Optional[float] = None
    cycle_count:   Optional[int]   = None
    capacity:      Optional[float] = None
    health_status: Optional[str]   = None
    generated_by:  Optional[int]   = None


# ─────────────────────────────────────────
# POST /api/reports
# Create new report
# ─────────────────────────────────────────
@router.post("/")
def create_report(report: ReportCreate, db: Session = Depends(get_db)):
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
                "generated_by":  report.generated_by
            }
        )
        db.commit()
        return {"status": "success", "message": "Report created successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────
# GET /api/reports
# Get all reports
# ─────────────────────────────────────────
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
            "reports": [dict(r._mapping) for r in reports]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────
# GET /api/reports/{report_id}
# Get single report
# ─────────────────────────────────────────
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

        return {
            "status": "success",
            "report": dict(report._mapping)
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────
# DELETE /api/reports/{report_id}
# Delete report
# ─────────────────────────────────────────
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

    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))