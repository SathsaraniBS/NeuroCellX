from sqlalchemy import create_engine, Column, Integer, Float, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# --------------------------------------------------
# Database Configuration
# --------------------------------------------------

# PostgreSQL connection details
# Format:
# postgresql://username:password@host:port/database_name
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:adminbss@localhost:5432/battery_db"

# Create database engine (connects FastAPI to PostgreSQL)
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create session factory for performing database operations (CRUD)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class that all models (tables) will inherit from
Base = declarative_base()


# --------------------------------------------------
# Battery Logs Table Model
# --------------------------------------------------

# This class represents the "battery_logs" table in PostgreSQL
class BatteryRecord(Base):
    __tablename__ = "battery_logs"

    # Unique ID for each record (Primary Key)
    id = Column(Integer, primary_key=True, index=True)

    # Battery voltage value
    voltage = Column(Float)

    # Battery temperature value
    temperature = Column(Float)

    # Predicted State of Health (SOH) result from ML model
    soh_result = Column(Float)


# --------------------------------------------------
# Create tables automatically in the database
# --------------------------------------------------
# This will create battery_logs table if it does not exist
Base.metadata.create_all(bind=engine)