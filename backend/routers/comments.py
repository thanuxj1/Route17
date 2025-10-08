from fastapi import APIRouter, HTTPException
from database import comments_collection
from schemas.bus import CommentCreate, CommentOut
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/comments")

@router.get("/bus/{bus_id}", response_model=list[CommentOut])
def get_comments(bus_id: str):
    comments = list(comments_collection.find({"bus_id": bus_id}))
    return comments

@router.post("/", response_model=CommentOut)
def create_comment(comment: CommentCreate):
    comment_dict = {
        "content": comment.content,
        "bus_id": comment.bus_id,
        "created_at": datetime.utcnow()
    }
    result = comments_collection.insert_one(comment_dict)
    comment_dict["_id"] = result.inserted_id
    return comment_dict

@router.delete("/delete/{comment_id}")
def delete_comment(comment_id: str):
    if not ObjectId.is_valid(comment_id):
        return {"message": "Invalid comment ID"}
    result = comments_collection.find_one_and_delete({"_id": ObjectId(comment_id)})
    if not result:
        return {"message": "Comment not found"}
    return {"message": "Comment deleted successfully"}
