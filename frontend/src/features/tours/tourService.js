import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "api/tours",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

export const addtour = (tourData) => API.post("/addtour", tourData);
export const getTours = () => API.get("/");
export const getToursByUser = (userId) => API.get(`/userTours/${userId}`); // user id
export const updateTour = (updatedTourData, id) =>
  API.patch(`/${id}`, updatedTourData);
export const deleteTour = (id) => API.delete(`/${id}`);
export const getToursBySearch = (searchQuery) =>
  API.get(`/search?searchQuery=${searchQuery}`);
