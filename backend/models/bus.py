# models/bus.py

from sqlalchemy import Column, Integer, String, Time
from database import Base

class BusTime(Base):
    __tablename__ = "bus_times"

    id = Column(Integer, primary_key=True, index=True)
    bus_number = Column(String(255), nullable=False)
    arrival_time = Column(Time, nullable=False)
    destination = Column(String(255), nullable=False)