from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from models.password_stat import PasswordStat
from schemas.stats import StatsCreate, GlobalStats


async def insert_stat(db: AsyncSession, payload: StatsCreate) -> None:
    stat = PasswordStat(
        score=payload.score,
        length=payload.length,
        crack_time_seconds=payload.crack_time_seconds,
        charset_flags=payload.charset_flags.model_dump(),
    )
    db.add(stat)
    await db.commit()


async def get_global_stats(db: AsyncSession) -> GlobalStats:
    result = await db.execute(
        select(
            func.count().label("total"),
            func.avg(PasswordStat.score).label("avg_score"),
            func.avg(PasswordStat.length).label("avg_length"),
        )
    )
    row = result.one()
    return GlobalStats(
        total_analyzed=row.total or 0,
        avg_score=round(float(row.avg_score or 0), 1),
        avg_length=round(float(row.avg_length or 0), 1),
    )
