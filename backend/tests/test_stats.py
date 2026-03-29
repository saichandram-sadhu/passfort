import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import AsyncMock, patch
from main import app


@pytest.mark.asyncio
async def test_post_stats_valid():
    with patch("routers.stats.insert_stat", new_callable=AsyncMock):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            res = await client.post(
                "/api/stats",
                json={
                    "score": 72,
                    "length": 14,
                    "crack_time_seconds": 1e8,
                    "charset_flags": {"upper": True, "lower": True, "digit": True, "symbol": False},
                },
            )
    assert res.status_code == 200
    assert res.json() == {"ok": True}


@pytest.mark.asyncio
async def test_post_stats_invalid_score():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.post(
            "/api/stats",
            json={
                "score": 150,
                "length": 8,
                "crack_time_seconds": 100,
                "charset_flags": {"upper": True, "lower": True, "digit": False, "symbol": False},
            },
        )
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_get_stats():
    from schemas.stats import GlobalStats

    mock_stats = GlobalStats(total_analyzed=42, avg_score=65.3, avg_length=11.2)
    with patch("routers.stats.get_global_stats", new_callable=AsyncMock, return_value=mock_stats):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            res = await client.get("/api/stats")
    assert res.status_code == 200
    data = res.json()
    assert data["total_analyzed"] == 42
