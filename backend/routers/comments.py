from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.comment import Comment
from database import get_db
from schemas.bus import CommentCreate, CommentOut

router = APIRouter(prefix="/comments")


@router.get("/bus/{bus_id}", response_model=list[CommentOut])
def get_comments(bus_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.bus_id == bus_id).all()
    return comments


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
