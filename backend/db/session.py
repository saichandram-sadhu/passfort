import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

raw_url = os.environ.get(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:postgres@localhost/passfort_dev",
)
# Railway provides postgresql:// without +asyncpg — normalize it
DATABASE_URL = raw_url.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(DATABASE_URL, pool_pre_ping=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
