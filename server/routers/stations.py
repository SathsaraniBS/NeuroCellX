from fastapi import APIRouter
import requests

router = APIRouter(tags=["stations"])

OCM_API_KEY = "de4be4a3-d33c-429d-8bfd-963c17d8731d"

# ─────────────────────────────────────────
# Nearby Stations (OpenChargeMap)
# ─────────────────────────────────────────
@router.get("/nearby-stations")
async def get_stations(lat: float, lng: float):
    url = (
        f"https://api.openchargemap.io/v3/poi/"
        f"?output=json&latitude={lat}&longitude={lng}"
        f"&distance=50&maxresults=20&key={OCM_API_KEY}"
    )
    headers = {'User-Agent': 'VoltIQ'}

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch data"}


# ─────────────────────────────────────────
# Trending EVs
# ─────────────────────────────────────────
@router.get("/trending-evs")
async def get_trending_evs():
    return {
        "trending_evs": [
            {
                "id": 1,
                "name": "Tesla Model 3",
                "brand": "Tesla",
                "range_km": 560,
                "charge_time": "6h",
                "price_usd": 40000,
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_facelift%2C_front_8.15.19.jpg/320px-2019_Tesla_Model_3_facelift%2C_front_8.15.19.jpg"
            },
            {
                "id": 2,
                "name": "Nissan Leaf",
                "brand": "Nissan",
                "range_km": 270,
                "charge_time": "8h",
                "price_usd": 28000,
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/2018_Nissan_Leaf_revealed_at_Nissan_HQ%2C_Atsugi%2C_Japan.jpg/320px-2018_Nissan_Leaf_revealed_at_Nissan_HQ%2C_Atsugi%2C_Japan.jpg"
            },
            {
                "id": 3,
                "name": "BYD Atto 3",
                "brand": "BYD",
                "range_km": 420,
                "charge_time": "7h",
                "price_usd": 35000,
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/BYD_Atto_3_China_facelift.jpg/320px-BYD_Atto_3_China_facelift.jpg"
            },
            {
                "id": 4,
                "name": "Hyundai IONIQ 6",
                "brand": "Hyundai",
                "range_km": 614,
                "charge_time": "5h",
                "price_usd": 45000,
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Hyundai_IONIQ_6_at_IAA_2023_%28cropped%29.jpg/320px-Hyundai_IONIQ_6_at_IAA_2023_%28cropped%29.jpg"
            },
            {
                "id": 5,
                "name": "MG ZS EV",
                "brand": "MG",
                "range_km": 320,
                "charge_time": "6h",
                "price_usd": 25000,
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/MG_ZS_EV_facelift_%28front%29%2C_2022_Seoul_Mobility_Show.jpg/320px-MG_ZS_EV_facelift_%28front%29%2C_2022_Seoul_Mobility_Show.jpg"
            }
        ]
    }