from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from slowapi import Limiter
from slowapi.util import get_remote_address
from db.session import get_db
from schemas.stats import StatsCreate, GlobalStats
from services.stats_service import insert_stat, get_global_stats

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/stats", status_code=200)
@limiter.limit("10/minute")
async def post_stats(
    request: Request, payload: StatsCreate, db: AsyncSession = Depends(get_db)
):
    await insert_stat(db, payload)
    return {"ok": True}


@router.get("/stats", response_model=GlobalStats)
async def read_stats(db: AsyncSession = Depends(get_db)):
    return await get_global_stats(db)
