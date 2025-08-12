import axios from "axios";

const API_URL = "https://route17-production.up.railway.app/comments";

// Get all comments for a specific bus
export async function getComments(busId, userId = 1) {
  const response = await axios.get(`${API_URL}/${busId}`, {
    params: { user_id: userId }
  });
  return response.data;
}

// Create a new comment
export async function createComment(commentData) {
  try {
    const response = await axios.post(API_URL, {
      content: commentData.content,
      bus_id: commentData.busId
    });
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}

// Delete a comment
export async function deleteComment(commentId) {
  const response = await axios.delete(`${API_URL}/delete/${commentId}`);
  return response.data;
}
// Get vote count for a comment
export async function getVotes(commentId) {
  try {
    const response = await axios.get(`https://route17-production.up.railway.app/votes/comment/${commentId}`);
    return response.data.total;
  } catch (error) {
    console.error("Error fetching votes:", error);
    return 0;
  }
}

// Submit a vote
export async function submitVote(commentId, userId, value) {
  try {
    await axios.post('https://route17-production.up.railway.app/votes/', {
      comment_id: commentId,
      user_id: userId,
      value: value
    });
  } catch (error) {
    console.error("Error submitting vote:", error);
    throw error;
  }
}