import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "api/users",
  // like this ??
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

export const register = (formData) => API.post("/register", formData);
export const login = (formData) => API.post("/login", formData);
