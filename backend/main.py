from fastapi import FastAPI
from routers import votes
from database import engine
from models import bus  # make sure this imports the BusTime model correctly
from routers import comments #comments router import
from routers import bus as bus_router


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (adjust in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)
# Create tables automatically
bus.Base.metadata.create_all(bind=engine)

# Include router
app.include_router(bus_router.router, tags=["Bus"])
app.include_router(comments.router, tags=["Comments"])
app.include_router(votes.router, prefix="/votes")  # Include votes router

@app.get("/")
def root():
    return {"message": "Bus Tracker Backend is working!"}
