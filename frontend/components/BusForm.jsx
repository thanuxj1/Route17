import React, { useState, useEffect } from "react";

const BusForm = ({ onSubmit, editData }) => {
  const [formData, setFormData] = useState({
    bus_number: "",
    arrival_time: "10:00", // Default time
    destination: "",
    status: "" 
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        bus_number: editData.bus_number ?? "",
        arrival_time: (editData.arrival_time ?? "10:00").slice(0, 5),
        destination: editData.destination ?? "",
        status: editData.status ?? ""  // ✅ fix: was bus.status (undefined)
      });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formattedTime = formData.arrival_time;
    if (formattedTime.length === 5) {
      formattedTime += ":00";
    }

    const payload = {
      bus_number: formData.bus_number.trim(),
      arrival_time: formattedTime,
      destination: formData.destination.trim(),
      status: formData.status.trim()   // ✅ include status in payload
    };

    console.log("Submitting payload:", payload);
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Bus Number"
        value={formData.bus_number}
        onChange={(e) =>
          setFormData({ ...formData, bus_number: e.target.value })
        }
        required
      />
      <input
        type="time"
        value={formData.arrival_time}
        onChange={(e) =>
          setFormData({ ...formData, arrival_time: e.target.value })
        }
        required
        step="60"
      />
      <input
        type="text"
        placeholder="Destination"
        value={formData.destination}
        onChange={(e) =>
          setFormData({ ...formData, destination: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Status"
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
        required
      />
      <button type="submit">{editData ? "Update" : "Add"} Bus Time</button>
    </form>
  );
};

export default BusForm;