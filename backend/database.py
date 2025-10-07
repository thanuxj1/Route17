from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# MongoDB connection string
MONGODB_URI = os.getenv("MONGODB_URI")

# Create MongoDB client
client = MongoClient(MONGODB_URI)

# Get database
db = client.get_database("bus_tracker")  # You can change the database name

# Collections
bus_times_collection = db["bus_times"]
comments_collection = db["comments"]

# Function to get database (for consistency with previous code)
def get_db():
    return db