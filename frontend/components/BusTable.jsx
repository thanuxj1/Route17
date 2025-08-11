import React from "react";
import "./BusTable.css";

const BusTable = ({ busTimes, onEdit, onDelete }) => {
  return (
    <div className="table-container">
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
  );
};

export default BusTable;
