# routers/votes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.comment import Vote
from database import get_db
from schemas.bus import VoteCreate

router = APIRouter(prefix="/votes")

@router.post("/", response_model=VoteCreate)
def submit_vote(vote: VoteCreate, db: Session = Depends(get_db)):
    try:
        existing_vote = db.query(Vote).filter(
            Vote.comment_id == vote.comment_id,
            Vote.user_id == vote.user_id
        ).first()

        if existing_vote:
            existing_vote.value = vote.value
        else:
            new_vote = Vote(
                comment_id=vote.comment_id,
                user_id=vote.user_id,
                value=vote.value
            )
            db.add(new_vote)

        db.commit()
        db.refresh(existing_vote or new_vote)
        return existing_vote or new_vote
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
