from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from schemas.bus import CommentCreate, CommentOut, VoteCreate
import models
from models.comment import Comment
from models.comment import Vote
from database import get_db
from sqlalchemy import func


router = APIRouter(prefix="/comments")


@router.get("/{bus_id}", response_model=List[CommentOut])
def get_comments(bus_id: int, user_id: int = Query(...), db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.bus_id == bus_id).all()
    results = []

    for comment in comments:
        total_votes = db.query(func.sum(Vote.value)).filter(Vote.comment_id == comment.id).scalar() or 0
        user_vote = db.query(Vote).filter(
            Vote.comment_id == comment.id,
            Vote.user_id == user_id
        ).first()

        results.append(CommentOut(
            id=comment.id,
            content=comment.content,
            bus_id=comment.bus_id,
            total_votes=total_votes,
            user_vote=user_vote.value if user_vote else 0
        ))

    return results



@router.post("/", response_model=CommentOut)
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    new_comment = Comment(
        content=comment.content,
        bus_id=comment.bus_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment