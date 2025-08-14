import { useEffect, useState } from "react";
import { getComments, createComment, deleteComment } from "../../api/commentApi";
import "./UserBusView.css";

export default function CommentSection({ busId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const comments = await getComments(busId);
      setComments(comments);
    } catch (err) {
      console.error("Failed to fetch comments", err);
      setError("Failed to load comments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await createComment({ content: newComment, busId });
      setNewComment("");
      await fetchComments();
    } catch (err) {
      console.error("Failed to post comment", err);
      setError("Failed to post comment. Please try again.");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
      setError("Failed to delete comment. Please try again.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [busId]);

  return (
    <div className="comments-section mt-4 pt-4">
      <h3 className="comments-title">Live Updates</h3>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="flex mb-4 gap-2">
        <textarea
          className="comment-input"
          rows="2"
          placeholder="Add a passenger update..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="post-button"
          disabled={isLoading || !newComment.trim()}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </form>

      {isLoading ? (
        <div className="loading-comments">Loading comments...</div>
      ) : comments.length > 0 ? (
        <div className="comments-container">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p className="comment-content">{comment.content}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(comment.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-comments">
          No updates yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}
