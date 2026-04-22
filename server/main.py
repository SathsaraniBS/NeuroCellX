# server/main.py
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.chatbot import router as chatbot_router  

from routers import auth
from routers import dashboard
from database import engine, Base
from routers import admin 
from routers import datasets 
from routers import contact     
from routers import predict    
from routers import calculator  


app = FastAPI(
    title="VoltIQ - EV Battery Health Prediction System",
    description="AI-powered EV battery SOH, SOC and RUL prediction API",
    version="1.0.0"
)

# CORS Middleware
# Allows React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",      #  Vite React dev server
        "http://127.0.0.1:5173",      #  alternate localhost
    ],                                #  FIXED: removed "*" - conflicts with credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(admin.router)  
app.include_router(datasets.router) 
app.include_router(predict.router) 
app.include_router(contact.router)
app.include_router(chatbot_router, prefix="/api")
app.include_router(calculator.router)  

# Create all database tables on startup
Base.metadata.create_all(bind=engine)  

# Health Check
# GET /
@app.get("/")
def home():
    return {                           # FIXED: removed broken get_db() call
        "message": "VoltIQ - EV Battery Health Backend is Running!",
        "status": "online",
        "version": "1.0.0"
    }

@app.get("/")
def root():
    return {"message": "VoltIQ API Running!"}