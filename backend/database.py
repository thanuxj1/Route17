from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# 👉 Connection string to MySQL
SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL")


# 👉 SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 👉 SessionLocal will be used for DB sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 👉 Base class for models
Base = declarative_base()

# ✅ Function to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
