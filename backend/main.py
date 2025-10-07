import os
from fastapi import FastAPI
from routers import comments
from routers import bus as bus_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Fixed CORS configuration - NO TRAILING SLASHES
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://route17.vercel.app",  # No trailing slash
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(bus_router.router, tags=["Bus"])
app.include_router(comments.router, tags=["Comments"])

@app.get("/")
def root():
    return {"message": "Bus Tracker Backend is working with MongoDB!"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "database": "mongodb"}