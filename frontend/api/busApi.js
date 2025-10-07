import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

const CACHE_KEY = "busTimes";
const CACHE_TTL = 2 * 60 * 1000;

const getCached = () => {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) return data;
  }
  return null;
};

const setCache = (data) => {
  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
};

export const getBusTimes = async () => {
  const cached = getCached();
  if (cached) return cached;

  try {
    const { data } = await API.get("/bus/");
    // MongoDB returns _id as string, map it to id for consistency
    const normalized = data.map(bus => ({
      ...bus,
      id: bus._id || bus.id, // Use _id from MongoDB, fallback to id
    }));
    setCache(normalized);
    return normalized;
  } catch (err) {
    console.error("❌ Fetch bus times failed:", err.message);
    return cached || [];
  }
};

export const addBusTime = async (newTime) => {
  try {
    const { data } = await API.post("/bus/", newTime);
    sessionStorage.removeItem(CACHE_KEY);
    // Normalize the response
    return {
      ...data,
      id: data._id || data.id,
    };
  } catch (err) {
    console.error("❌ Add bus time failed:", err.response?.data || err.message);
    throw err;
  }
};

export const updateBusTime = async (id, updatedTime) => {
  try {
    // MongoDB uses string IDs, so ensure id is passed as string
    const { data } = await API.put(`/bus/${id}`, updatedTime);
    sessionStorage.removeItem(CACHE_KEY);
    return {
      ...data,
      id: data._id || data.id,
    };
  } catch (err) {
    console.error("❌ Update bus time failed:", err.response?.data || err.message);
    throw err;
  }
};

export const deleteBusTime = async (id) => {
  try {
    // MongoDB uses string IDs
    const { data } = await API.delete(`/bus/${id}`);
    sessionStorage.removeItem(CACHE_KEY);
    return {
      ...data,
      id: data._id || data.id,
    };
  } catch (err) {
    console.error("❌ Delete bus time failed:", err.response?.data || err.message);
    throw err;
  }
};