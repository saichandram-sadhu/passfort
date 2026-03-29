from sqlalchemy import BigInteger, SmallInteger, Float, JSON, TIMESTAMP, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from datetime import datetime


class Base(DeclarativeBase):
    pass


class PasswordStat(Base):
    __tablename__ = "password_stats"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    score: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    length: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    crack_time_seconds: Mapped[float] = mapped_column(Float, nullable=False)
    charset_flags: Mapped[dict] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=text("NOW()"), nullable=False
    )
