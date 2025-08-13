// src/api/busAPI.js
import axios from "axios";

const BASE_URL = "https://route17-production.up.railway.app";

// Create a reusable Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 5 seconds timeout
});

// Cache configuration
const CACHE_KEY = "busTimes";
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

// Utility to get cached data
const getCached = () => {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) return data;
  }
  return null;
};

// Utility to set cache
const setCache = (data) => {
  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
};

// Fetch all bus times with cache
export const getBusTimes = async () => {
  const cached = getCached();
  if (cached) return cached;

  try {
    const { data } = await API.get("/bus/");
    setCache(data);
    return data;
  } catch (err) {
    console.error("❌ Fetch bus times failed:", err.message);
    return cached || [];
  }
};

// Add a new bus time
export const addBusTime = async (newTime) => {
  try {
    const { data } = await API.post("/bus/", newTime);
    sessionStorage.removeItem(CACHE_KEY); // Invalidate cache
    return data;
  } catch (err) {
    console.error("❌ Add bus time failed:", err.response?.data || err.message);
    throw err;
  }
};

// Update an existing bus time
export const updateBusTime = async (id, updatedTime) => {
  try {
    const { data } = await API.put(`/bus/${id}`, updatedTime);
    sessionStorage.removeItem(CACHE_KEY); // Invalidate cache
    return data;
  } catch (err) {
    console.error("❌ Update bus time failed:", err.response?.data || err.message);
    throw err;
  }
};

// Delete a bus time
export const deleteBusTime = async (id) => {
  try {
    const { data } = await API.delete(`/bus/${id}`);
    sessionStorage.removeItem(CACHE_KEY); // Invalidate cache
    return data;
  } catch (err) {
    console.error("❌ Delete bus time failed:", err.response?.data || err.message);
    throw err;
  }
};
