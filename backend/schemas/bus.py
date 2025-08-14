from typing import Optional, Union
from pydantic import BaseModel, field_validator, Field
from datetime import time

# Bus time models
class BusTimeBase(BaseModel):
    bus_number: str
    arrival_time: time
    destination: str
    status: str
    checked: bool = Field(default=False)  # Explicit default with Field

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

class BusTimeUpdate(BaseModel):
    bus_number: Optional[str] = None
    arrival_time: Optional[Union[time, str]] = None
    destination: Optional[str] = None
    status: Optional[str] = None
    checked: Optional[bool] = None

    @field_validator("arrival_time", mode="before")
    def validate_arrival_time(cls, v):
        if v is None or v == "":
            return None
        if isinstance(v, time):
            return v
        if isinstance(v, str):
            parts = list(map(int, v.split(":")))
            if len(parts) == 2:
                return time(parts[0], parts[1])
            elif len(parts) == 3:
                return time(parts[0], parts[1], parts[2])
        raise ValueError("Time must be in HH:MM or HH:MM:SS format")

class BusTimeResponse(BusTimeBase):
    id: int
    
    @field_validator('checked', mode='before')
    def handle_none_checked(cls, v):
        return False if v is None else v
    
    class Config:
        from_attributes = True

# Comment models
class CommentCreate(BaseModel):
    content: str
    bus_id: int

class CommentOut(BaseModel):
    id: int
    content: str
    bus_id: int

    model_config = {
        "from_attributes": True
    }
