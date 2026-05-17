# backend/app/routes/dashboard.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


# ─────────────────────────────────────────────────────────────
# GET /api/dashboard/battery-logs
# ✅ FIXED: reports table query කරනවා (full data)
#           battery_logs table → only voltage, temperature, soh_result
#           reports table      → soh_predicted, rul_predicted, report_name, etc.
# ─────────────────────────────────────────────────────────────
@router.get("/battery-logs")
def get_battery_logs(db: Session = Depends(get_db)):
    try:
        logs = db.execute(
            text("""
                SELECT
                    r.id,
                    r.report_name,
                    r.report_type,
                    r.battery_id,
                    r.soh_predicted,
                    r.rul_predicted,
                    r.health_status,
                    r.voltage,
                    r.current_a,
                    r.temperature,
                    r.cycle_count,
                    r.capacity,
                    r.created_at,
                    u.name AS generated_by_name
                FROM reports r
                LEFT JOIN users u ON r.generated_by = u.id
                ORDER BY r.created_at DESC
                LIMIT 20
            """)
        ).fetchall()

        return {
            "status": "success",
            "count":  len(logs),
            "logs":   [dict(log._mapping) for log in logs]
        }

    except Exception as e:
        print(f"[ERROR] battery-logs: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ─────────────────────────────────────────────────────────────
# GET /api/dashboard/summary
# ✅ FIXED: reports table use කරනවා
# ─────────────────────────────────────────────────────────────
@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    try:
        result = db.execute(
            text("""
                SELECT
                    ROUND(AVG(soh_predicted), 2)   AS avg_soh,
                    ROUND(AVG(rul_predicted), 2)   AS avg_rul,
                    ROUND(AVG(voltage), 4)          AS avg_voltage,
                    ROUND(AVG(temperature), 2)      AS avg_temperature,
                    COUNT(*)                        AS total_records,
                    COUNT(CASE WHEN soh_predicted >= 90 THEN 1 END) AS healthy_count,
                    COUNT(CASE WHEN soh_predicted >= 75 AND soh_predicted < 90 THEN 1 END) AS moderate_count,
                    COUNT(CASE WHEN soh_predicted < 75 THEN 1 END)  AS critical_count
                FROM reports
            """)
        ).fetchone()

        if not result:
            return {
                "status": "success",
                "avg_soh": 0, "avg_rul": 0,
                "avg_voltage": 0, "avg_temperature": 0,
                "total_records": 0,
                "healthy_count": 0, "moderate_count": 0, "critical_count": 0
            }

        m = result._mapping
        return {
            "status":         "success",
            "avg_soh":        float(m["avg_soh"]         or 0),
            "avg_rul":        float(m["avg_rul"]         or 0),
            "avg_voltage":    float(m["avg_voltage"]     or 0),
            "avg_temperature":float(m["avg_temperature"] or 0),
            "total_records":  int(m["total_records"]     or 0),
            "healthy_count":  int(m["healthy_count"]     or 0),
            "moderate_count": int(m["moderate_count"]    or 0),
            "critical_count": int(m["critical_count"]    or 0),
        }

    except Exception as e:
        print(f"[ERROR] dashboard-summary: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ─────────────────────────────────────────────────────────────
# GET /api/dashboard/health-status
# ✅ FIXED: reports table use කරනවා
# ─────────────────────────────────────────────────────────────
@router.get("/health-status")
def get_health_status(db: Session = Depends(get_db)):
    try:
        result = db.execute(
            text("""
                SELECT soh_predicted
                FROM reports
                ORDER BY created_at DESC
                LIMIT 1
            """)
        ).fetchone()

        if not result:
            return {"status": "success", "health": "No Data", "soh": 0}

        soh = float(result._mapping["soh_predicted"] or 0)

        if   soh >= 90: health, color = "Healthy",  "green"
        elif soh >= 75: health, color = "Moderate", "yellow"
        elif soh >= 60: health, color = "Warning",  "orange"
        else:           health, color = "Critical", "red"

        return {
            "status": "success",
            "health": health,
            "color":  color,
            "soh":    round(soh, 2)
        }

    except Exception as e:
        print(f"[ERROR] health-status: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ─────────────────────────────────────────────────────────────
# GET /api/dashboard/recent-alerts
# ✅ FIXED: reports table use කරනවා
# ─────────────────────────────────────────────────────────────
@router.get("/recent-alerts")
def get_recent_alerts(db: Session = Depends(get_db)):
    try:
        alerts = db.execute(
            text("""
                SELECT
                    id, report_name, battery_id,
                    soh_predicted, rul_predicted,
                    health_status, voltage, temperature,
                    created_at
                FROM reports
                WHERE soh_predicted < 75
                ORDER BY created_at DESC
                LIMIT 10
            """)
        ).fetchall()

        result = []
        for alert in alerts:
            m   = alert._mapping
            soh = float(m["soh_predicted"] or 0)
            result.append({
                "id":           m["id"],
                "report_name":  m["report_name"],
                "battery_id":   m["battery_id"],
                "soh":          soh,
                "rul":          float(m["rul_predicted"] or 0),
                "health_status":m["health_status"],
                "severity":     "Critical" if soh < 65 else "Warning",
                "voltage":      float(m["voltage"] or 0),
                "temperature":  float(m["temperature"] or 0),
                "created_at":   str(m["created_at"])
            })

        return {"status": "success", "count": len(result), "alerts": result}

    except Exception as e:
        print(f"[ERROR] recent-alerts: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")