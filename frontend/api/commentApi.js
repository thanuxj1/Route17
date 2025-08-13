import axios from "axios";

const API_BASE = "https://route17-production.up.railway.app";
const COMMENTS_URL = `${API_BASE}/comments`;
const VOTES_URL = `${API_BASE}/votes`;

/**
 * Get all comments for a specific bus
 * @param {number} busId 
 * @param {number} userId 
 * @returns {Promise<Array>}
 */
export async function getComments(busId, userId = 1) {
  try {
    const { data } = await axios.get(`${COMMENTS_URL}/${busId}`, {
      params: { user_id: userId }
    });
    return data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
}

/**
 * Create a new comment
 * @param {{content: string, busId: number}} commentData
 * @returns {Promise<Object>}
 */
export async function createComment({ content, busId }) {
  try {
    const { data } = await axios.post(COMMENTS_URL, { content, bus_id: busId });
    return data;
  } catch (err) {
    console.error("Error posting comment:", err);
    throw err;
  }
}

/**
 * Delete a comment
 * @param {number} commentId
 * @returns {Promise<Object>}
 */
export async function deleteComment(commentId) {
  try {
    const { data } = await axios.delete(`${COMMENTS_URL}/delete/${commentId}`);
    return data;
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
}

/**
 * Get vote count for a comment
 * @param {number} commentId
 * @returns {Promise<number>}
 */
export async function getVotes(commentId) {
  try {
    const { data } = await axios.get(`${VOTES_URL}/comment/${commentId}`);
    return data.total ?? 0;
  } catch (err) {
    console.error("Error fetching votes:", err);
    return 0;
  }
}

/**
 * Submit a vote
 * @param {number} commentId
 * @param {number} userId
 * @param {number} value
 */
export async function submitVote(commentId, userId, value) {
  try {
    await axios.post(`${VOTES_URL}/`, {
      comment_id: commentId,
      user_id: userId,
      value
    });
  } catch (err) {
    console.error("Error submitting vote:", err);
    throw err;
  }
}
