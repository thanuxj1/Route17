import axios from "axios";

const API_BASE = "https://route17-production.up.railway.app";
const COMMENTS_URL = `${API_BASE}/comments`;
const VOTES_URL = `${API_BASE}/votes`;

/**
 * Get all comments for a specific bus with vote counts and user's vote status
 * @param {number} busId 
 * @param {number} userId 
 * @returns {Promise<Array>} Sorted comments by vote count (descending)
 */
export async function getComments(busId, userId = 1) {
  try {
    const { data } = await axios.get(`${COMMENTS_URL}/bus/${busId}`, {
      params: { user_id: userId }
    });
    // Comments are already sorted by the backend by total_votes descending
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

/**
 * Delete a comment
 * @param {number} commentId
 * @returns {Promise<Object>}
 */
export async function deleteComment(commentId) {
  try {
    const { data } = await axios.delete(`${COMMENTS_URL}/${commentId}`);
    return data;
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
}

/**
 * Submit or update a vote
 * @param {number} commentId
 * @param {number} userId
 * @param {number} value (1 for upvote, -1 for downvote, 0 to remove vote)
 * @returns {Promise<Object>}
 */
export async function submitVote(commentId, userId, value) {
  try {
    const { data } = await axios.post(VOTES_URL, {
      comment_id: commentId,
      user_id: userId,
      value: value
    });
    return data;
  } catch (err) {
    console.error("Error submitting vote:", err);
    throw err;
  }
}

/**
 * Get vote details for a specific comment
 * @param {number} commentId
 * @returns {Promise<{total: number, votes: Array}>}
 */
export async function getVoteDetails(commentId) {
  try {
    const { data } = await axios.get(`${VOTES_URL}/comment/${commentId}`);
    return data;
  } catch (err) {
    console.error("Error fetching vote details:", err);
    return { total: 0, votes: [] };
  }
}

/**
 * Get the current user's vote for a comment
 * @param {number} commentId 
 * @param {number} userId 
 * @returns {Promise<number>} 1, -1, or 0 if no vote
 */
export async function getUserVote(commentId, userId) {
  try {
    const { data } = await axios.get(`${VOTES_URL}/user_vote`, {
      params: { comment_id: commentId, user_id: userId }
    });
    return data.value || 0;
  } catch (err) {
    console.error("Error fetching user vote:", err);
    return 0;
  }
}