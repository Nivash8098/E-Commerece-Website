
import axios from "axios";

// Updated to 8000 to match Django default, based on your manage.py
const BASE_URL = "http://127.0.0.1:8000/api";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleApiError = (error: any) => {
  if (!error.response) {
    if (window.location.protocol === 'https:') {
      return "Security Block: You are using HTTPS but the backend is HTTP. Please use HTTP for both.";
    }
    return `Server Unreachable: Ensure your Django server is running at http://127.0.0.1:8000.`;
  }
  return error.response.data?.message || "An unexpected server error occurred.";
};

export const checkServerHealth = async () => {
  try {
    await axios.get(`${BASE_URL}/products`, { timeout: 2000 });
    return true;
  } catch (e) {
    return false;
  }
};

// New method to persist orders to database
export const createOrder = async (orderData: any) => {
  return await API.post("/orders/", orderData); // Added trailing slash common in Django
};

export default API;
