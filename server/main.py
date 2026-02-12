from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app instance
app = FastAPI()

# Enable CORS so React frontend can communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Allow requests from all domains (change in production)
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Home route to check if server is running
@app.get("/")
def home():
    return {"message": "EV Battery Health Backend is Running!"}


# Simple dummy prediction endpoint
# Accepts voltage and temperature values from frontend
@app.post("/predict-dummy")
def predict_dummy(voltage: float, temperature: float):
    
    # For now, we return a fixed value
    # Later you can replace this with ML model prediction
    return {
        "status": "Success",
        "predicted_soh": 95.5,   # Dummy State of Health value
        "message": "Model is not yet integrated"
    }