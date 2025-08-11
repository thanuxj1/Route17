import os
from fastapi import FastAPI
from routers import votes
from database import engine
from models import bus
from routers import comments
from routers import bus as bus_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn  # <-- import uvicorn here

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Create tables automatically
bus.Base.metadata.create_all(bind=engine)

app.include_router(bus_router.router, tags=["Bus"])
app.include_router(comments.router, tags=["Comments"])
app.include_router(votes.router, prefix="/votes")

@app.get("/")
def root():
    return {"message": "Bus Tracker Backend is working!"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))  # get port from environment variable, default 8000
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
