from fastapi import APIRouter
import requests

router = APIRouter(tags=["stations"])

OCM_API_KEY = "de4be4a3-d33c-429d-8bfd-963c17d8731d"

@router.get("/nearby-stations")
async def get_stations(lat: float, lng: float):
    url = f"https://api.openchargemap.io/v3/poi/?output=json&latitude={lat}&longitude={lng}&distance=50&maxresults=20&key={OCM_API_KEY}"
    headers = {'User-Agent': 'VoltIQ'}
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch data"}