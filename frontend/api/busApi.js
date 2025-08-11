// src/api/busAPI.js
// 👉 Handles API requests to your FastAPI backend

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"; // Backend URL

export const getBusTimes = async () => {
  const response = await axios.get(`${BASE_URL}/bus/`);
  return response.data;
};

export const addBusTime = async (newTime) => {
  try {
    const response = await axios.post(`${BASE_URL}/bus/`, newTime);
    return response.data;
  } catch (err) {
    console.error("❌ Add BusTime failed:", err.response?.data || err.message);
    throw err;
  }
};


export const updateBusTime = async (id, updatedTime) => {
  const response = await axios.put(`${BASE_URL}/bus/${id}`, updatedTime);
  return response.data;
};

export const deleteBusTime = async (id) => {
  const response = await axios.delete(`${BASE_URL}/bus/${id}`);
  return response.data;
};
