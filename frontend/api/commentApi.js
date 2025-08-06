import axios from "axios";

const API_URL = "http://localhost:8000/comments"; // Changed port to 8000 to match backend

export const commentAPI = {
  // Get all comments for a specific bus
  async getComments(busId, userId) {
  const response = await axios.get(`${API_URL}/${busId}`, {
    params: {
      user_id: userId  // THIS is crucial
    }
  });
  return response.data;
},


  // Create a new comment
  async createComment(commentData) {
    try {
      const response = await axios.post(API_URL, {
        content: commentData.content,
        bus_id: commentData.busId  // Match your backend expected field name
      });
      return response.data;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  },

  // Get vote count for a comment (if using separate votes)
  async getVotes(commentId) {
    try {
      const response = await axios.get(`http://localhost:8000/votes/comment/${commentId}`);
      return response.data.total;
    } catch (error) {
      console.error("Error fetching votes:", error);
      return 0; // Default to 0 if error occurs
    }
  },

  // Submit a vote (if using separate votes)
  async submitVote(commentId, userId, value) {
    try {
      await axios.post('http://localhost:8000/votes/', {
        comment_id: commentId,
        user_id: userId,
        value: value
      });
    } catch (error) {
      console.error("Error submitting vote:", error);
      throw error;
    }
  }
};