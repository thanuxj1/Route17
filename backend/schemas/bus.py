# schemas/bus.py

from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import time, datetime, timezone


# ==========================
# Bus Schemas
# ==========================
class BusTimeCreate(BaseModel):
    bus_number: str
    arrival_time: time
    destination: str
    status: str = "On Time"
    checked: Optional[bool] = False


class BusTimeUpdate(BaseModel):
    bus_number: Optional[str] = None
    arrival_time: Optional[time] = None
    destination: Optional[str] = None
    status: Optional[str] = None
    checked: Optional[bool] = None


class BusTimeResponse(BaseModel):
    id: str = Field(alias="_id")
    bus_number: str
    arrival_time: str
    destination: str
    status: str
    checked: bool

    @validator('id', pre=True)
    def convert_objectid(cls, v):
        return str(v)

    @validator('checked', pre=True)
    def ensure_checked_bool(cls, v):
        return v if v is not None else False

    class Config:
        populate_by_name = True
        json_encoders = {
            str: str
        }


# ==========================
# Comment Schemas
# ==========================
class CommentCreate(BaseModel):
    content: str
    bus_id: str


class CommentOut(BaseModel):
    id: str = Field(alias="_id")
    content: str
    bus_id: str
    created_at: Optional[str] = None  # ✅ Return as string instead of datetime

    @validator('id', pre=True)
    def convert_objectid(cls, v):
        return str(v)

    @validator('created_at', pre=True, always=True)
    def ensure_utc_isoformat(cls, v):
        """Ensure datetime is timezone-aware and formatted with Z."""
        if not v:
            return None
        if isinstance(v, datetime):
            if v.tzinfo is None:
                v = v.replace(tzinfo=timezone.utc)
            return v.isoformat().replace("+00:00", "Z")
        return v

    class Config:
        populate_by_name = True
