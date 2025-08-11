import React from "react";
import "./BusTable.css";

const BusTable = ({ busTimes, onEdit, onDelete }) => {
  return (
    <div>
      {/* Table for desktop */}
      <div className="table-container show-desktop">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Bus Number</th>
              <th className="table-header-cell">Arrival Time</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {busTimes.map((bus) => (
              <tr key={bus.id} className="table-row">
                <td className="table-cell">{bus.bus_number}</td>
                <td className="table-cell">{bus.arrival_time}</td>
                <td className="table-cell">
                  <button
                    onClick={() => onEdit(bus)}
                    className="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(bus.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Card layout for mobile */}
      <div className="card-list show-mobile">
        {busTimes.map((bus) => (
          <div className="bus-card" key={bus.id}>
            <div><strong>Bus Number:</strong> {bus.bus_number}</div>
            <div><strong>Arrival Time:</strong> {bus.arrival_time}</div>
            <div className="card-actions">
              <button onClick={() => onEdit(bus)} className="button">Edit</button>
              <button onClick={() => onDelete(bus.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusTable;