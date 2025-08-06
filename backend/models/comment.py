from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(500), nullable=False)
    bus_id = Column(Integer, ForeignKey("bus_times.id"))


class Vote(Base):
    __tablename__ = "votes"
    
    id = Column(Integer, primary_key=True, index=True)
    comment_id = Column(Integer, ForeignKey("comments.id"))
    user_id = Column(Integer)
    value = Column(Integer)  # 1 for upvote, -1 for downvote
