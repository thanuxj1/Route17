import axios from "axios";

const API_BASE = "https://route17-production.up.railway.app";
const COMMENTS_URL = `${API_BASE}/comments`;
const VOTES_URL = `${API_BASE}/votes`;

/**
 * Get comments for a specific bus with vote information
 * @param {number} busId - ID of the bus
 * @param {number} [userId=1] - ID of the current user
 * @returns {Promise<Array>} Array of comment objects
 */
export async function getComments(busId, userId = 1) {
  try {
    const { data } = await axios.get(`${COMMENTS_URL}/bus/${busId}`, {
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
 * @param {Object} commentData - Comment data
 * @param {string} commentData.content - Comment text
 * @param {number} commentData.busId - ID of the bus
 * @returns {Promise<Object>} The created comment
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
 * Submit a vote for a comment
 * @param {number} commentId - ID of the comment
 * @param {number} userId - ID of the user voting
 * @param {number} value - Vote value (1 = upvote, -1 = downvote, 0 = remove vote)
 * @returns {Promise<Object>} Vote result
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