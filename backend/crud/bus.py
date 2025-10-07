from fastapi import HTTPException
from database import bus_times_collection
from schemas.bus import BusTimeCreate, BusTimeUpdate
from bson import ObjectId
from datetime import datetime

def create_bus_time(bus: BusTimeCreate):
    try:
        bus_dict = {
            "bus_number": bus.bus_number,
            "arrival_time": str(bus.arrival_time),  # Convert time to string
            "destination": bus.destination,
            "status": bus.status,
            "checked": bus.checked if bus.checked is not None else False
        }
        result = bus_times_collection.insert_one(bus_dict)
        bus_dict["_id"] = result.inserted_id
        return bus_dict
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def get_all_bus_times():
    buses = list(bus_times_collection.find())
    # Sort by arrival_time
    buses.sort(key=lambda x: x.get('arrival_time', ''))
    return buses


def update_bus_time(bus_id: str, bus: BusTimeUpdate):
    if not ObjectId.is_valid(bus_id):
        return None
    
    update_data = bus.dict(exclude_unset=True)
    
    # Convert time to string if present
    if 'arrival_time' in update_data and update_data['arrival_time'] is not None:
        update_data['arrival_time'] = str(update_data['arrival_time'])
    
    if 'checked' in update_data and update_data['checked'] is None:
        update_data['checked'] = False
    
    result = bus_times_collection.find_one_and_update(
        {"_id": ObjectId(bus_id)},
        {"$set": update_data},
        return_document=True
    )
    return result


def delete_bus_time(bus_id: str):
    if not ObjectId.is_valid(bus_id):
        return None
    
    result = bus_times_collection.find_one_and_delete({"_id": ObjectId(bus_id)})
    return result