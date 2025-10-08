# routers/comments.py

from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime, timezone
from database import comments_collection
from schemas.bus import CommentCreate, CommentOut

router = APIRouter(prefix="/comments", tags=["Comments"])


@router.get("/bus/{bus_id}", response_model=list[CommentOut])
def get_comments(bus_id: str):
    """
    Fetch all comments for a given bus, sorted by newest first.
    """
    comments = list(
        comments_collection.find({"bus_id": bus_id}).sort("created_at", -1)
    )

    # Ensure each comment has a string id for JSON serialization
    for comment in comments:
        comment["_id"] = str(comment["_id"])

    return comments


@router.post("/", response_model=CommentOut)
def create_comment(comment: CommentCreate):
    """
    Create a new comment with UTC timestamp.
    """
    comment_dict = {
        "content": comment.content,
        "bus_id": comment.bus_id,
        "created_at": datetime.now(timezone.utc),  # ✅ Timezone-aware UTC datetime
    }

    result = comments_collection.insert_one(comment_dict)
    comment_dict["_id"] = str(result.inserted_id)

    return comment_dict


@router.delete("/delete/{comment_id}")
def delete_comment(comment_id: str):
    """
    Delete a comment by ID.
    """
    if not ObjectId.is_valid(comment_id):
        raise HTTPException(status_code=400, detail="Invalid comment ID")

    result = comments_collection.find_one_and_delete({"_id": ObjectId(comment_id)})

    if not result:
        raise HTTPException(status_code=404, detail="Comment not found or already deleted")

    return {"message": "Comment deleted successfully"}
