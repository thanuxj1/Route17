"use client";

import { useEffect, useState } from "react";
import {
  getBusTimes,
  addBusTime,
  updateBusTime,
  deleteBusTime,
} from "../../api/busApi";
import { getComments, deleteComment } from "../../api/commentApi";
import {  LoaderCircle } from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
  const [busTimes, setBusTimes] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
  bus_number: "",
  arrival_time: "",
  destination: "",
  status: "" // ✅ Add here
});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBusTimes();
  }, []);

  const fetchBusTimes = async () => {
    setLoading(true);
    const data = await getBusTimes();
    setBusTimes(data);

    const commentsData = {};
    for (const bus of data) {
      commentsData[bus.id] = await getComments(bus.id, 1);
    }
    setComments(commentsData);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (editId) {
    await updateBusTime(editId, form);
  } else {
    await addBusTime(form);
  }
  setForm({ bus_number: "", arrival_time: "", destination: "", status: "" }); // ✅ Reset status too
  setEditId(null);
  fetchBusTimes();
};

const handleEdit = (bus) => {
  setForm({
    bus_number: bus.bus_number ?? "",
    arrival_time: bus.arrival_time ?? "",
    destination: bus.destination ?? "",
    status: bus.status ?? "" // ✅ Populate from backend
  });
  setEditId(bus.id);
};

  const handleDelete = async (id) => {
    await deleteBusTime(id);
    fetchBusTimes();
  };

  const handleDeleteComment = async (commentId, busId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => ({
        ...prev,
        [busId]: prev[busId].filter((c) => c.id !== commentId),
      }));
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <LoaderCircle className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">🚌 Bus Times Dashboard</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Bus Number"
          value={form.bus_number}
          onChange={(e) => setForm({ ...form, bus_number: e.target.value })}
          required
          className="form-input"
        />

        <input
          type="text"
          placeholder="Destination"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
          required
          className="form-input"
        />

        <input
          type="time"
          placeholder="Arrival Time"
          value={form.arrival_time}
          onChange={(e) => setForm({ ...form, arrival_time: e.target.value })}
          required
          className="form-input"
        />
        <input
  type="text"
  placeholder="Status"
  value={form.status}
  onChange={(e) => setForm({ ...form, status: e.target.value })}
  required
  className="form-input"
/>


        <button type="submit" className="add-button">
          {editId ? "Update" : "Add"} Bus
        </button>
      </form>

      <ul className="bus-grid">
        {busTimes.map((bus) => (
          <li key={bus.id} className="bus-card">
            <div className="bus-info">
              <p className="bus-number">{bus.bus_number}</p>
              <p className="bus-detail">
                <span className="bus-label">Destination:</span>
                <span className="bus-value">{bus.destination}</span>
              </p>
              <p className="bus-detail">
                <span className="bus-label">Arrival:</span>
                <span className="bus-value">{bus.arrival_time}</span>
              </p>
              <p className="bus-detail">
  <span className="bus-label">Status:</span>
  <span className="bus-value">{bus.status}</span>
</p>

            </div>

            <div className="bus-actions">
              <button className="edit-button" onClick={() => handleEdit(bus)}>
                ✏️ Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(bus.id)}
              >
                🗑️ Delete
              </button>
            </div>

            <div className="comments-section">
              <div className="comments-header">Comments:</div>
              <ul className="comments-list">
                {comments[bus.id]?.length ? (
                  comments[bus.id].map((comment) => (
                    <li key={comment.id} className="comment-item">
                      <p className="comment-content">{comment.content}</p>
                      <button
                        className="comment-delete"
                        onClick={() =>
                          handleDeleteComment(comment.id, bus.id)
                        }
                      >
                        Delete
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="no-comments">No comments yet.</p>
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
