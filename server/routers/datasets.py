# backend/routers/datasets.py
import os
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from typing import Optional

router = APIRouter(prefix="/api/datasets", tags=["Datasets"])

# ─────────────────────────────────────────
# Required columns for EV battery dataset
# ─────────────────────────────────────────
REQUIRED_COLUMNS = ['voltage', 'current', 'temperature', 'cycle_count']
UPLOAD_DIR = "uploaded_datasets"

# Create upload directory if not exists
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ─────────────────────────────────────────
# POST /api/datasets/upload
# Upload and validate CSV dataset
# ─────────────────────────────────────────
@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    uploaded_by: int = Form(...),
    db: Session = Depends(get_db)
):
    try:
        # ── Validate file type ──────────────
        if not file.filename.endswith('.csv'):
            raise HTTPException(
                status_code=400,
                detail="Only CSV files are allowed"
            )

        # ── Read file content ───────────────
        contents = await file.read()
        file_size_kb = round(len(contents) / 1024, 2)

        # ── Validate file size (max 50MB) ───
        if file_size_kb > 51200:
            raise HTTPException(
                status_code=400,
                detail="File size exceeds 50MB limit"
            )

        # ── Parse CSV ───────────────────────
        import io
        df = pd.read_csv(io.BytesIO(contents))

        # ── Get column names (lowercase) ────
        df.columns = [col.lower().strip() for col in df.columns]
        actual_columns = list(df.columns)

        # ── Validate required columns ───────
        missing_columns = [
            col for col in REQUIRED_COLUMNS
            if col not in actual_columns
        ]

        if missing_columns:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns: {', '.join(missing_columns)}"
            )

        # ── Data quality checks ─────────────
        warnings = []
        null_counts = df.isnull().sum()
        for col in REQUIRED_COLUMNS:
            if col in df.columns and null_counts[col] > 0:
                warnings.append(
                    f"{null_counts[col]} missing values in '{col}'"
                )

        # ── Save file to disk ───────────────
        safe_filename = file.filename.replace(" ", "_")
        file_path = os.path.join(UPLOAD_DIR, safe_filename)
        with open(file_path, "wb") as f:
            f.write(contents)

        # ── Save metadata to database ───────
        db.execute(
            text("""
                INSERT INTO datasets
                    (name, file_path, row_count, col_count,
                     file_size, status, uploaded_by)
                VALUES
                    (:name, :file_path, :row_count, :col_count,
                     :file_size, :status, :uploaded_by)
            """),
            {
                "name":        safe_filename,
                "file_path":   file_path,
                "row_count":   len(df),
                "col_count":   len(df.columns),
                "file_size":   file_size_kb,
                "status":      "Validated",
                "uploaded_by": uploaded_by
            }
        )
        db.commit()

        # ── Return preview (first 10 rows) ──
        preview = df.head(10).fillna("").to_dict(orient="records")

        return {
            "status":   "success",
            "message":  "Dataset uploaded and validated successfully!",
            "metadata": {
                "name":      safe_filename,
                "rows":      len(df),
                "columns":   len(df.columns),
                "col_names": actual_columns,
                "file_size": f"{file_size_kb} KB",
                "warnings":  warnings
            },
            "preview": preview
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}"
        )


# ─────────────────────────────────────────
# GET /api/datasets/list
# Get all uploaded datasets
# ─────────────────────────────────────────
@router.get("/list")
def get_datasets(db: Session = Depends(get_db)):
    try:
        datasets = db.execute(
            text("""
                SELECT 
                    d.id, d.name, d.row_count, d.col_count,
                    d.file_size, d.status, d.created_at,
                    u.name AS uploaded_by_name
                FROM datasets d
                LEFT JOIN users u ON d.uploaded_by = u.id
                ORDER BY d.created_at DESC
            """)
        ).fetchall()

        return {
            "status":   "success",
            "count":    len(datasets),
            "datasets": [dict(d._mapping) for d in datasets]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────
# GET /api/datasets/{dataset_id}/preview
# Preview dataset rows
# ─────────────────────────────────────────
@router.get("/{dataset_id}/preview")
def preview_dataset(dataset_id: int, db: Session = Depends(get_db)):
    try:
        dataset = db.execute(
            text("SELECT * FROM datasets WHERE id = :id"),
            {"id": dataset_id}
        ).fetchone()

        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset not found")

        # Read file and return preview
        df = pd.read_csv(dataset._mapping["file_path"])
        df.columns = [col.lower().strip() for col in df.columns]
        preview = df.head(20).fillna("").to_dict(orient="records")

        return {
            "status":    "success",
            "name":      dataset._mapping["name"],
            "row_count": dataset._mapping["row_count"],
            "preview":   preview,
            "columns":   list(df.columns)
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────
# DELETE /api/datasets/{dataset_id}
# Delete dataset
# ─────────────────────────────────────────
@router.delete("/{dataset_id}")
def delete_dataset(dataset_id: int, db: Session = Depends(get_db)):
    try:
        dataset = db.execute(
            text("SELECT * FROM datasets WHERE id = :id"),
            {"id": dataset_id}
        ).fetchone()

        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset not found")

        # Delete file from disk
        file_path = dataset._mapping["file_path"]
        if file_path and os.path.exists(file_path):
            os.remove(file_path)

        # Delete from database
        db.execute(
            text("DELETE FROM datasets WHERE id = :id"),
            {"id": dataset_id}
        )
        db.commit()

        return {"status": "success", "message": "Dataset deleted successfully"}

    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────
# PUT /api/datasets/{dataset_id}/status
# Update dataset status
# ─────────────────────────────────────────
@router.put("/{dataset_id}/status")
def update_status(
    dataset_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    try:
        db.execute(
            text("UPDATE datasets SET status = :status WHERE id = :id"),
            {"status": status, "id": dataset_id}
        )
        db.commit()
        return {"status": "success", "message": f"Status updated to {status}"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))