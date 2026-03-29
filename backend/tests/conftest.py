from unittest.mock import AsyncMock
import pytest


@pytest.fixture(autouse=True)
def no_db_init(monkeypatch):
    monkeypatch.setattr("main.init_db", AsyncMock())
