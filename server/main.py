# server/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth
from database import engine, Base, get_db

app = FastAPI(title="EV Battery Health Prediction System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*"   
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    """Simple health-check endpoint"""
    db = get_db() # Use get_db() to retrieve the database connection
    return {"message": "EV Battery Health Backend is Running!", "db": db}