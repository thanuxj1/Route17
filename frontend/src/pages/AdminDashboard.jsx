import { useEffect, useState } from "react";
import {
  getBusTimes,
  addBusTime,
  updateBusTime,
  deleteBusTime,
} from "../../api/busApi";
import { getComments,deleteComment} from "../../api/commentApi"; // make sure you have getComments here
import { useAuth } from "../pages/AuthContext";
import { LogOut, LoaderCircle } from "lucide-react";

function Dashboard() {
  const [busTimes, setBusTimes] = useState([]);
  const [comments, setComments] = useState({}); // key: busId, value: array of comments
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    bus_number: "",
    arrival_time: "",
    destination: "",
  });
  const [editId, setEditId] = useState(null);

  const { logout } = useAuth();

  useEffect(() => {
    fetchBusTimes();
  }, []);

  // Fetch bus times and comments for each bus
  const fetchBusTimes = async () => {
    setLoading(true);
    const data = await getBusTimes();
    setBusTimes(data);

    // Fetch comments for each bus
    const commentsData = {};
    for (const bus of data) {
      commentsData[bus.id] = await getComments(bus.id, 1); // Always pass user_id
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
    setForm({ bus_number: "", arrival_time: "", destination: "" });
    setEditId(null);
    fetchBusTimes();
  };

  const handleEdit = (bus) => {
    setForm({
      bus_number: bus.bus_number ?? "",
      arrival_time: bus.arrival_time ?? "",
      destination: bus.destination ?? "",
    });
    setEditId(bus.id);
  };

  const handleDelete = async (id) => {
    await deleteBusTime(id);
    fetchBusTimes();
  };

  const handleDeleteComment = async (commentId, busId) => {
  console.log("Deleting comment id:", commentId, "for bus:", busId);
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
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {/* Logout button */}
      <button
        onClick={logout}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100"
      >
        <LogOut size={16} />
        Logout
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">🚌 Bus Times Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Bus Number"
          value={form.bus_number}
          onChange={(e) => setForm({ ...form, bus_number: e.target.value })}
          required
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Destination"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
          required
          className="border p-2 w-full"
        />

        <input
          type="time"
          placeholder="Arrival Time"
          value={form.arrival_time}
          onChange={(e) => setForm({ ...form, arrival_time: e.target.value })}
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update" : "Add"} Time
        </button>
      </form>

      <ul className="space-y-4">
        {busTimes.map((bus) => (
          <li
            key={bus.id}
            className="p-4 border rounded flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Bus:</span> {bus.bus_number}
                </p>
                <p>
                  <span className="font-semibold">Destination:</span> {bus.destination}
                </p>
                <p>
                  <span className="font-semibold">Arrival:</span> {bus.arrival_time}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(bus)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(bus.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>

            {/* Comments section */}
            <div>
              <h3 className="font-semibold mb-2">Comments:</h3>
              {comments[bus.id]?.length ? (
                <ul className="space-y-2">
                  {comments[bus.id].map((comment) => (
                    <li
                      key={comment.id}
                      className="border p-2 rounded flex justify-between items-center"
                    >
                      <p>{comment.content}</p>
                      <button
                        onClick={() => handleDeleteComment(comment.id, bus.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
