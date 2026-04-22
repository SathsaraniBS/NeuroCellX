from fastapi import APIRouter
import httpx

router = APIRouter(
    prefix="/api/calculator",
    tags=["calculator"]
)

API_KEY = "f60a6456694f6d2072a33adb"
EXTERNAL_URL = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/USD"

@router.get("/get-rates")
async def get_rates():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(EXTERNAL_URL)
            data = response.json()
            return data.get("conversion_rates", {})
        except Exception as e:
            return {"error": str(e)}