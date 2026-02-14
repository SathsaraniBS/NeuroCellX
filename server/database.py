from sqlalchemy import create_engine, Column, Integer, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# --------------------------------------------------
# Database Configuration
# --------------------------------------------------

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:adminbss@localhost:5432/battery_db"

# Create database engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models
Base = declarative_base()

# --------------------------------------------------
# Battery Logs Table Model
# --------------------------------------------------

class BatteryRecord(Base):
    __tablename__ = "battery_logs"

    id = Column(Integer, primary_key=True, index=True)
    voltage = Column(Float)
    temperature = Column(Float)
    soh_result = Column(Float)