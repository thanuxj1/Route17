
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.bus import BusTimeCreate, BusTimeResponse, BusTimeUpdate
from crud.bus import create_bus_time, get_all_bus_times, update_bus_time, delete_bus_time
from datetime import time


router = APIRouter(prefix="/bus", tags=["Bus"])

@router.post("/", response_model=BusTimeResponse)
def add_bus_time(bus: BusTimeCreate, db: Session = Depends(get_db)):
    return create_bus_time(db, bus)

@router.get("/", response_model=list[BusTimeResponse])
def get_bus_times(db: Session = Depends(get_db)):
    return get_all_bus_times(db)

@router.put("/{bus_id}", response_model=BusTimeResponse)
def edit_bus_time(bus_id: int, bus: BusTimeUpdate, db: Session = Depends(get_db)):
    updated = update_bus_time(db, bus_id, bus)
    if not updated:
        raise HTTPException(status_code=404, detail="Bus time not found")
    return updated

@router.delete("/{bus_id}", response_model=BusTimeResponse)
def remove_bus_time(bus_id: int, db: Session = Depends(get_db)):
    deleted = delete_bus_time(db, bus_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Bus time not found")
    return deleted
