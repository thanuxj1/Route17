from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import time
from models.bus import BusTime
from schemas.bus import BusTimeCreate, BusTimeUpdate

def create_bus_time(db: Session, bus: BusTimeCreate):
    try:
        new_bus = BusTime(
            bus_number=bus.bus_number,
            arrival_time=bus.arrival_time,
            destination=bus.destination,
            status=bus.status,
            checked=bus.checked if bus.checked is not None else False  # Ensure not None
        )
        db.add(new_bus)
        db.commit()
        db.refresh(new_bus)
        return new_bus
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

def get_all_bus_times(db: Session):
    buses = db.query(BusTime).order_by(BusTime.arrival_time.asc()).all()
    # The BusTimeResponse model will handle NULL to False conversion
    return buses

def update_bus_time(db: Session, bus_id: int, bus: BusTimeUpdate):
    bus_db = db.query(BusTime).filter(BusTime.id == bus_id).first()
    if not bus_db:
        return None
    
    update_data = bus.dict(exclude_unset=True)
    if 'checked' in update_data and update_data['checked'] is None:
        update_data['checked'] = False  # Convert None to False
    
    for key, value in update_data.items():
        setattr(bus_db, key, value)
    
    db.commit()
    db.refresh(bus_db)
    return bus_db

def delete_bus_time(db: Session, bus_id: int):
    bus_db = db.query(BusTime).filter(BusTime.id == bus_id).first()
    if not bus_db:
        return None
    
    db.delete(bus_db)
    db.commit()
    return bus_db