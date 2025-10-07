import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "http://127.0.0.1:8000";

const COMMENTS_URL = `${API_BASE}/comments`;

export async function getComments(busId) {
  try {
    const { data } = await axios.get(`${COMMENTS_URL}/bus/${busId}`);
    return data.map((comment) => ({
      ...comment,
      id: comment._id || comment.id,
    }));
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
}

export async function createComment({ content, busId }) {
  try {
    const { data } = await axios.post(COMMENTS_URL, {
      content,
      bus_id: busId,
    });
    return { ...data, id: data._id || data.id };
  } catch (err) {
    console.error("Error posting comment:", err);
    throw err;
  }
}

export async function deleteComment(commentId) {
  try {
    const { data } = await axios.delete(`${COMMENTS_URL}/delete/${commentId}`);
    return data;
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
}
