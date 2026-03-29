from fastapi import APIRouter
from fastapi.responses import JSONResponse
from data.common_passwords import COMMON_PASSWORDS

router = APIRouter()


@router.get("/dictionary")
async def get_dictionary():
    return JSONResponse(
        content={"words": list(COMMON_PASSWORDS)},
        headers={"Cache-Control": "public, max-age=86400"},
    )
