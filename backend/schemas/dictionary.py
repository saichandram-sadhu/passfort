from pydantic import BaseModel
from typing import List


class DictionaryResponse(BaseModel):
    words: List[str]
