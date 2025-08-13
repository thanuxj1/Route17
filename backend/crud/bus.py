from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import time  # ✅ Add this import
from models.bus import BusTime
from schemas.bus import BusTimeCreate, BusTimeUpdate


def create_bus_time(db: Session, bus: BusTimeCreate):
    try:
        new_bus = BusTime(
            bus_number=bus.bus_number,
            arrival_time=bus.arrival_time,  # ✅ already a time object
            destination=bus.destination
        )

        db.add(new_bus)
        db.commit()
        db.refresh(new_bus)

        return {
            "id": new_bus.id,
            "bus_number": new_bus.bus_number,
            "arrival_time": new_bus.arrival_time.strftime("%H:%M:%S"),  # ✅ return as string
            "destination": new_bus.destination
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


def get_all_bus_times(db: Session):
    return db.query(BusTime).order_by(BusTime.arrival_time.asc()).all()
    # Convert time objects to strings for response
    return [
        {
            "id": bus.id,
            "bus_number": bus.bus_number,
            "arrival_time": bus.arrival_time.strftime("%H:%M:%S"),
            "destination": bus.destination
        }
        for bus in buses
    ]

def update_bus_time(db: Session, bus_id: int, bus: BusTimeUpdate):
    bus_db = db.query(BusTime).filter(BusTime.id == bus_id).first()
    if bus_db:
        for key, value in bus.dict().items():
            setattr(bus_db, key, value)
        db.commit()
        db.refresh(bus_db)
    return bus_db

def delete_bus_time(db: Session, bus_id: int):
    bus = db.query(BusTime).filter(BusTime.id == bus_id).first()
    if bus:
        db.delete(bus)
        db.commit()
    return bus
