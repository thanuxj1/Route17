import { useEffect, useState } from "react";
import axios from "axios";
import "./UserBusView.css";

export default function CommentSection({ busId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userVotes, setUserVotes] = useState({});
  const [isVoting, setIsVoting] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`https://route17-production.up.railway.app/comments/${busId}`, {
  params: { user_id: 1 }  // Replace 1 with real user ID in production
});

      // Sort comments by vote count (descending)
      const sortedComments = [...res.data].sort((a, b) => b.total_votes - a.total_votes);
      setComments(sortedComments);
      
      const initialVotes = {};
sortedComments.forEach(comment => {
  initialVotes[comment.id] = comment.user_vote || 0;
});
setUserVotes(initialVotes);

    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post("https://route17-production.up.railway.app/comments/", {
        content: newComment,
        bus_id: busId,
      });
      setNewComment("");
      fetchComments(); // This will fetch and sort the updated comments
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleVote = async (commentId, voteType) => {
  if (isVoting) return;
  setIsVoting(true);

  try {
    const currentVote = userVotes[commentId] || 0;
    let newVoteValue = 0;
    
    if (voteType === "up") {
      newVoteValue = currentVote === 1 ? 0 : 1;
    } else {
      newVoteValue = currentVote === -1 ? 0 : -1;
    }

    await axios.post("https://route17-production.up.railway.app/votes/", {
      user_id: 1,  // use actual user ID
      comment_id: commentId,
      value: newVoteValue
    });

    // Refresh comments to get updated data from server
    await fetchComments();
  } catch (error) {
    console.error("Vote failed:", error);
  } finally {
    setIsVoting(false);
  }
};
  useEffect(() => {
    fetchComments();
  }, [busId]);
return (
  <div className="comments-section mt-4 pt-4">
    <h3 className="comments-title">Live Updates</h3>
    {/* Desktop/table layout */}
    <div className="show-desktop">
      <form onSubmit={handleSubmit} className="flex mb-4 gap-2">
        <textarea
          className="comment-input"
          rows="2"
          placeholder="Add a passenger update..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="post-button">
          Post
        </button>
      </form>
      <div className="comments-container">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p>{comment.content}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <button
                    className={`${userVotes[comment.id] === 1 ? 'text-green-600' : 'text-green-400'} hover:text-green-300`}
                    onClick={() => handleVote(comment.id, "up")}
                    disabled={isVoting}
                  >
                    ▲
                  </button>
                  <span className="comment-number">{comment.total_votes || 0}</span>
                  <button
                    className={`${userVotes[comment.id] === -1 ? 'text-red-600' : 'text-red-400'} hover:text-red-300`}
                    onClick={() => handleVote(comment.id, "down")}
                    disabled={isVoting}
                  >
                    ▼
                  </button>
                </div>
                <span className="text-xs text-gray-400">#{comment.id}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments">No updates yet.</p>
        )}
      </div>
    </div>
    {/* Mobile/card layout */}
    <div className="show-mobile">
      <form onSubmit={handleSubmit} className="flex flex-col mb-4 gap-2">
        <textarea
          className="comment-input"
          rows="2"
          placeholder="Add a passeneger update..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="post-button">
          Post
        </button>
      </form>
      <div className="comments-container">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item" style={{ marginBottom: "1rem", borderRadius: "0.5rem", background: "#181c23" }}>
              <p style={{ marginBottom: "0.5rem" }}>{comment.content}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <button
                    className={`${userVotes[comment.id] === 1 ? 'text-green-600' : 'text-green-400'} hover:text-green-300`}
                    onClick={() => handleVote(comment.id, "up")}
                    disabled={isVoting}
                  >
                    ▲
                  </button>
                  <span className="comment-number">{comment.total_votes || 0}</span>
                  <button
                    className={`${userVotes[comment.id] === -1 ? 'text-red-600' : 'text-red-400'} hover:text-red-300`}
                    onClick={() => handleVote(comment.id, "down")}
                    disabled={isVoting}
                  >
                    ▼
                  </button>
                </div>
                <span className="text-xs text-gray-400">#{comment.id}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments">No updates yet.</p>
        )}
      </div>
    </div>
  </div>
  );
}