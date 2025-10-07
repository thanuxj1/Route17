from fastapi import APIRouter, HTTPException
from schemas.bus import BusTimeCreate, BusTimeResponse, BusTimeUpdate
from crud.bus import create_bus_time, get_all_bus_times, update_bus_time, delete_bus_time

router = APIRouter(prefix="/bus", tags=["Bus"])

@router.post("/", response_model=BusTimeResponse)
def add_bus_time(bus: BusTimeCreate):
    return create_bus_time(bus)

@router.get("/", response_model=list[BusTimeResponse])
def get_bus_times():
    return get_all_bus_times()

@router.put("/{bus_id}", response_model=BusTimeResponse)
def edit_bus_time(bus_id: str, bus: BusTimeUpdate):
    updated = update_bus_time(bus_id, bus)
    if not updated:
        raise HTTPException(status_code=404, detail="Bus time not found")
    return updated

@router.delete("/{bus_id}", response_model=BusTimeResponse)
def remove_bus_time(bus_id: str):
    deleted = delete_bus_time(bus_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Bus time not found")
    return deleted