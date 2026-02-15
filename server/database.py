# server/database.py
from sqlalchemy import create_engine, Column, Integer, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database connection URL
# Falls back to a local PostgreSQL connection if DATABASE_URL is not set in .env
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:adminbss@localhost:5433/battery_db"
)

# Create the SQLAlchemy engine (connection pool manager)
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=False,          # Set to True to log all SQL statements (useful for debugging)
    pool_size=5,         # Number of persistent connections kept open
    max_overflow=10      # Allow up to 10 extra connections beyond pool_size when needed
)

# Create a factory for new database sessions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class that all models inherit from
Base = declarative_base()

# SQLAlchemy model representing the battery_logs table
class BatteryRecord(Base):
    __tablename__ = "battery_logs"

    id = Column(Integer, primary_key=True, index=True)
    voltage = Column(Float)
    temperature = Column(Float)
    soh_result = Column(Float)  # Predicted State of Health (SOH) percentage

    # Optional: you can add a timestamp field like this:
    # created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

# FastAPI dependency that provides a database session per request
# Usage: in your routes → db: Session = Depends(get_db)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  # Always close the session after the request is done