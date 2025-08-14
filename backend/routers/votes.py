from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.comment import Vote
from schemas.bus import VoteCreate
from database import get_db

router = APIRouter(prefix="/votes")


@router.post("/")
def vote(vote: VoteCreate, db: Session = Depends(get_db)):
    existing_vote = db.query(Vote).filter(
        Vote.comment_id == vote.comment_id,
        Vote.user_id == vote.user_id
    ).first()

    if existing_vote:
        existing_vote.value = vote.value  # update existing
    else:
        new_vote = Vote(
            comment_id=vote.comment_id,
            user_id=vote.user_id,
            value=vote.value
        )
        db.add(new_vote)

    db.commit()
    return {"message": "Vote registered successfully"}


@router.get("/comment/{comment_id}")
async def get_comment_votes(comment_id: int, db: Session = Depends(get_db)):
    votes = db.query(Vote)\
        .filter(Vote.comment_id == comment_id)\
        .all()
    return {
        "total": sum(v.value for v in votes),
        "votes": votes
    }