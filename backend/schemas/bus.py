from typing import Optional
from pydantic import BaseModel, field_validator
from datetime import time

# 1️⃣ Base class first
class BusTimeBase(BaseModel):
    bus_number: str
    arrival_time: time
    destination: str
    status: str

    @field_validator("arrival_time", mode="before")
    def validate_arrival_time(cls, v):
        if v is None:
            return v
        if isinstance(v, time):
            return v
        if isinstance(v, str):
            parts = list(map(int, v.split(":")))
            if len(parts) == 2:
                return time(hour=parts[0], minute=parts[1])
            elif len(parts) == 3:
                return time(hour=parts[0], minute=parts[1], second=parts[2])
        raise ValueError("Time must be in HH:MM or HH:MM:SS format")

# 2️⃣ Derived classes
class BusTimeCreate(BusTimeBase):
    pass

class BusTimeUpdate(BaseModel):
    bus_number: Optional[str] = None
    arrival_time: Optional[time] = None
    destination: Optional[str] = None
    status: Optional[str] = None

    @field_validator("arrival_time", mode="before")
    def validate_arrival_time(cls, v):
        if v is None:
            return v
        if isinstance(v, time):
            return v
        if isinstance(v, str):
            parts = list(map(int, v.split(":")))
            if len(parts) == 2:
                return time(hour=parts[0], minute=parts[1])
            elif len(parts) == 3:
                return time(hour=parts[0], minute=parts[1], second=parts[2])
        raise ValueError("Time must be in HH:MM or HH:MM:SS format")

class BusTimeResponse(BusTimeBase):
    id: int

    class Config:
        from_attributes = True

# Comment & Vote schemas below...
class CommentCreate(BaseModel):
    content: str
    bus_id: int

class CommentOut(BaseModel):
    id: int
    content: str
    bus_id: int
    total_votes: int = 0
    user_vote: int = 0

    model_config = {"from_attributes": True}

class VoteCreate(BaseModel):
    comment_id: int