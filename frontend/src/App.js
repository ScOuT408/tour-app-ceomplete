import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddTour from "./pages/AddTour";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/ProctedRoute";

function App() {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "4.5rem",
            fontSize: "1rem",
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/addtour"
          element={
            <PrivateRoute>
              <AddTour />
            </PrivateRoute>
          }
        />
        <Route
          path="/editTour/:id"
          element={
            <PrivateRoute>
              <AddTour />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
