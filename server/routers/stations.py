from fastapi import APIRouter, HTTPException
from typing import List
from database import database, stations
from schemas import Station

router = APIRouter(
    prefix="/api/stations",
    tags=["stations"]
)

@router.get("/", response_model=List[Station])
async def get_stations():
    query = stations.select()
    return await database.fetch_all(query)

@router.get("/{station_id}", response_model=Station)
async def get_station(station_id: int):
    query = stations.select().where(stations.c.id == station_id)
    result = await database.fetch_one(query)
    if not result:
        raise HTTPException(status_code=404, detail="Station not found")
    return result