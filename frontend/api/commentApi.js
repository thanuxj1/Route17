import axios from "axios";

const API_BASE = "https://route17-production.up.railway.app";
const COMMENTS_URL = `${API_BASE}/comments/`; // trailing slash

// Fetch all comments for a specific bus
export async function getComments(busId) {
  try {
    const { data } = await axios.get(`${COMMENTS_URL}bus/${busId}`);
    return data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
}

// Create a new comment
export async function createComment({ content, busId }) {
  try {
    const { data } = await axios.post(COMMENTS_URL, { 
      content, 
      bus_id: busId 
    });
    return data;
  } catch (err) {
    console.error("Error posting comment:", err);
    throw err;
  }
}

// Delete a comment by ID
export async function deleteComment(commentId) {
  try {
    const { data } = await axios.delete(`${COMMENTS_URL}delete/${commentId}`);
    return data;
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
}
