# backend/app/routes/dashboard.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from datetime import datetime
from typing import List, Optional

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


# ─────────────────────────────────────────
# GET /api/dashboard/battery-logs
# Returns last 20 battery log records
# ─────────────────────────────────────────
@router.get("/battery-logs")
def get_battery_logs(db: Session = Depends(get_db)):
    try:
        logs = db.execute(
            text("""
                SELECT id, voltage, temperature, soh_result, created_at 
                FROM battery_logs 
                ORDER BY created_at DESC 
                LIMIT 20
            """)
        ).fetchall()

        return {
            "status": "success",
            "count": len(logs),
            "logs": [dict(log._mapping) for log in logs]  # ✅ Fixed _mapping
        }

    except Exception as e:
        print(f"[ERROR] battery-logs: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# ─────────────────────────────────────────
# GET /api/dashboard/summary
# Returns SOH, SOC, RUL, Cycle Count
# ─────────────────────────────────────────
@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    try:
        result = db.execute(
            text("""
                SELECT 
                    ROUND(AVG(soh_result), 2)   AS avg_soh,
                    ROUND(AVG(voltage), 4)       AS avg_voltage,
                    ROUND(AVG(temperature), 2)   AS avg_temperature,
                    COUNT(*)                     AS total_records
                FROM battery_logs
            """)
        ).fetchone()

        if not result:
            return {
                "status": "success",
                "avg_soh": 0,
                "avg_voltage": 0,
                "avg_temperature": 0,
                "total_records": 0
            }

        return {
            "status": "success",
            "avg_soh":         result._mapping["avg_soh"],
            "avg_voltage":     result._mapping["avg_voltage"],
            "avg_temperature": result._mapping["avg_temperature"],
            "total_records":   result._mapping["total_records"]
        }

    except Exception as e:
        print(f"[ERROR] dashboard-summary: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# ─────────────────────────────────────────
# GET /api/dashboard/health-status
# Returns Healthy / Warning / Critical
# ─────────────────────────────────────────
@router.get("/health-status")
def get_health_status(db: Session = Depends(get_db)):
    try:
        result = db.execute(
            text("""
                SELECT soh_result 
                FROM battery_logs 
                ORDER BY created_at DESC 
                LIMIT 1
            """)
        ).fetchone()

        if not result:
            return {"status": "success", "health": "No Data", "soh": 0}

        soh = float(result._mapping["soh_result"])

        # Health label based on SOH value
        if soh >= 90:
            health = "Healthy"
            color  = "green"
        elif soh >= 80:
            health = "Good"
            color  = "blue"
        elif soh >= 70:
            health = "Warning"
            color  = "yellow"
        else:
            health = "Critical"
            color  = "red"

        return {
            "status": "success",
            "health": health,
            "color":  color,
            "soh":    round(soh, 2)
        }

    except Exception as e:
        print(f"[ERROR] health-status: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# ─────────────────────────────────────────
# GET /api/dashboard/recent-alerts
# Returns latest warning/critical records
# ─────────────────────────────────────────
@router.get("/recent-alerts")
def get_recent_alerts(db: Session = Depends(get_db)):
    try:
        alerts = db.execute(
            text("""
                SELECT id, voltage, temperature, soh_result, created_at
                FROM battery_logs
                WHERE soh_result < 80
                ORDER BY created_at DESC
                LIMIT 10
            """)
        ).fetchall()

        result = []
        for alert in alerts:
            soh = float(alert._mapping["soh_result"])
            result.append({
                "id":          alert._mapping["id"],
                "voltage":     alert._mapping["voltage"],
                "temperature": alert._mapping["temperature"],
                "soh":         soh,
                "severity":    "Critical" if soh < 70 else "Warning",
                "created_at":  str(alert._mapping["created_at"])
            })

        return {
            "status": "success",
            "count":  len(result),
            "alerts": result
        }

    except Exception as e:
        print(f"[ERROR] recent-alerts: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )