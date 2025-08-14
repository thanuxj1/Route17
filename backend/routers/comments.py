from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from schemas.bus import CommentCreate, CommentOut, VoteCreate
import models
from models.comment import Comment
from models.comment import Vote
from database import get_db
from sqlalchemy import func
from sqlalchemy import select

router = APIRouter(prefix="/comments")



@router.get("/bus/{bus_id}")
async def get_comments(bus_id: int, user_id: int, db: Session = Depends(get_db)):
    # Subquery for the current user's vote on each comment
    user_vote_subq = (
        select(Vote.value)
        .where(Vote.comment_id == Comment.id)
        .where(Vote.user_id == user_id)
        .correlate(Comment)
        .scalar_subquery()
    )

    comments = (
        db.query(
            Comment,
            func.coalesce(func.sum(Vote.value), 0).label('total_votes'),
            func.coalesce(user_vote_subq, 0).label('user_vote')
        )
        .outerjoin(Vote, Vote.comment_id == Comment.id)
        .filter(Comment.bus_id == bus_id)
        .group_by(Comment.id)
        .order_by(func.coalesce(func.sum(Vote.value), 0).desc())
        .all()
    )

    return [
        {
            "id": comment.id,
            "content": comment.content,
            "bus_id": comment.bus_id,
            "total_votes": total_votes,
            "user_vote": user_vote
        }
        for comment, total_votes, user_vote in comments
    ]


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

@router.delete("/delete/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        return {"message": "Comment already deleted or not found"}
    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted successfully"}
