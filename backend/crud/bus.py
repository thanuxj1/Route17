from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import time  # ✅ Add this import
from models.bus import BusTime
from schemas.bus import BusTimeCreate, BusTimeUpdate


def create_bus_time(db: Session, bus: BusTimeCreate):
    try:
        new_bus = BusTime(
            bus_number=bus.bus_number,
            arrival_time=bus.arrival_time,
            destination=bus.destination,
            status=bus.status,
            checked=bus.checked
        )

        db.add(new_bus)
        db.commit()
        db.refresh(new_bus)
        return new_bus  # <- return the object, NOT a dict
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


def get_all_bus_times(db: Session):
    return db.query(BusTime).order_by(BusTime.arrival_time.asc()).all()


def update_bus_time(db: Session, bus_id: int, bus: BusTimeUpdate):
    bus_db = db.query(BusTime).filter(BusTime.id == bus_id).first()
    if bus_db:
        for key, value in bus.dict(exclude_unset=True).items():  # ❌ only fields actually sent
            setattr(bus_db, key, value)
        db.commit()
        db.refresh(bus_db)
        return bus_db
    return None



def delete_bus_time(db: Session, bus_id: int):
    bus_db = db.query(BusTime).filter(BusTime.id == bus_id).first()
    if bus_db:
        db.delete(bus_db)
        db.commit()
        return bus_db
    return None

    bus = db.query(BusTime).filter(BusTime.id == bus_id).first()
    if bus:
        db.delete(bus)
        db.commit()
    return bus