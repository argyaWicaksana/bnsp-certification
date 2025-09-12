import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_API

const api = axios.create({
  baseURL: `${BASE_API}/api`, // ganti sesuai backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
)

export default api;
