import pytest
from httpx import AsyncClient, ASGITransport
from main import app
from data.common_passwords import COMMON_PASSWORDS


@pytest.mark.asyncio
async def test_get_dictionary_returns_words():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/dictionary")
    assert res.status_code == 200
    data = res.json()
    assert "words" in data
    assert len(data["words"]) == len(COMMON_PASSWORDS)
    assert "max-age=86400" in res.headers.get("cache-control", "")
