import React from "react";

const BusTable = ({ busTimes, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Bus Number</th>
          <th>Arrival Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {busTimes.map((bus) => (
          <tr key={bus.id}>
            <td>{bus.bus_number}</td>
            <td>{bus.arrival_time}</td>
            <td>
              <button onClick={() => onEdit(bus)}>Edit</button>
              <button onClick={() => onDelete(bus.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BusTable;