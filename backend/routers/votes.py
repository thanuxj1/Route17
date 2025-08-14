# routers/votes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.comment import Vote, Comment  # <-- import Comment too
from database import get_db
from pydantic import BaseModel

router = APIRouter(prefix="/votes")

# Response model for returning votes
class VoteOut(BaseModel):
    comment_id: int
    user_id: int
    value: int

    class Config:
        orm_mode = True

# Request model
class VoteCreate(BaseModel):
    comment_id: int
    user_id: int
    value: int

@router.post("/", response_model=VoteOut)
def submit_vote(vote: VoteCreate, db: Session = Depends(get_db)):
    try:
        # Check if comment exists
        comment = db.query(Comment).filter(Comment.id == vote.comment_id).first()
        if not comment:
            raise HTTPException(status_code=404, detail="Comment not found")

        # Check if user already voted
        existing_vote = db.query(Vote).filter(
            Vote.comment_id == vote.comment_id,
            Vote.user_id == vote.user_id
        ).first()

        if existing_vote:
            existing_vote.value = vote.value
            db.commit()
            db.refresh(existing_vote)
            return existing_vote
        else:
            new_vote = Vote(
                comment_id=vote.comment_id,
                user_id=vote.user_id,
                value=vote.value
            )
            db.add(new_vote)
            db.commit()
            db.refresh(new_vote)
            return new_vote

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Vote failed: {e}")

@router.get("/comment/{comment_id}")
def get_vote_details(comment_id: int, db: Session = Depends(get_db)):
    votes = db.query(Vote).filter(Vote.comment_id == comment_id).all()
    total = sum(v.value for v in votes)
    return {"total": total, "votes": votes}

@router.get("/user_vote")
def get_user_vote(comment_id: int, user_id: int, db: Session = Depends(get_db)):
    vote = db.query(Vote).filter(
        Vote.comment_id == comment_id,
        Vote.user_id == user_id
    ).first()
    return {"value": vote.value if vote else 0}
