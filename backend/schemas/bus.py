from typing import Optional
from pydantic import BaseModel, field_validator
from datetime import time

class BusTimeBase(BaseModel):
    bus_number: str
    arrival_time: time
    destination: str
    status: str
    checked: bool = False  # ✅ default false


    @field_validator("arrival_time", mode="before")
    def validate_arrival_time(cls, v):
        if isinstance(v, time):
            return v
        if isinstance(v, str):
            try:
                parts = list(map(int, v.split(":")))
                if len(parts) == 2:
                    return time(hour=parts[0], minute=parts[1])
                elif len(parts) == 3:
                    return time(hour=parts[0], minute=parts[1], second=parts[2])
            except Exception:
                pass
        raise ValueError("Time must be in HH:MM or HH:MM:SS format")


    
class BusTimeCreate(BusTimeBase):
    pass

class BusTimeUpdate(BusTimeBase):
    pass

class BusTimeResponse(BusTimeBase):
    id: int
    class Config:
        from_attributes = True


#this is comment section realted only 

class CommentCreate(BaseModel):
    content: str
    bus_id: int

class CommentOut(BaseModel):
    id: int
    content: str
    bus_id: int
    total_votes: int = 0
    user_vote: int = 0

    model_config = {
        "from_attributes": True
    }

class VoteCreate(BaseModel):
    comment_id: int