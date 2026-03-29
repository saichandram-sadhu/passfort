from pydantic import BaseModel, Field


class CharsetFlags(BaseModel):
    upper: bool
    lower: bool
    digit: bool
    symbol: bool


class StatsCreate(BaseModel):
    score: int = Field(..., ge=0, le=100)
    length: int = Field(..., ge=1, le=512)
    crack_time_seconds: float = Field(..., ge=0)
    charset_flags: CharsetFlags


class GlobalStats(BaseModel):
    total_analyzed: int
    avg_score: float
    avg_length: float
