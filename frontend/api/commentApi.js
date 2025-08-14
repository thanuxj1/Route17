import axios from "axios";

const API_BASE = "https://route17-production.up.railway.app";
const COMMENTS_URL = `${API_BASE}/comments/`; // <-- trailing slash added
const VOTES_URL = `${API_BASE}/votes/`;       // <-- trailing slash added

export async function getComments(busId, userId = 1) {
  try {
    const { data } = await axios.get(`${COMMENTS_URL}bus/${busId}`, {
      params: { user_id: userId }
    });
    return data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
}

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

export async function getVoteDetails(commentId) {
  try {
    const { data } = await axios.get(`${VOTES_URL}comment/${commentId}`);
    return data;
  } catch (err) {
    console.error("Error fetching vote details:", err);
    return { total: 0, votes: [] };
  }
}

export async function getUserVote(commentId, userId) {
  try {
    const { data } = await axios.get(`${VOTES_URL}user_vote`, {
      params: { comment_id: commentId, user_id: userId }
    });
    return data.value || 0;
  } catch (err) {
    console.error("Error fetching user vote:", err);
    return 0;
  }
}
