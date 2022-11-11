import express from "express";
import {
  createTour,
  deleteTour,
  getTours,
  getToursBySearch,
  getToursByUser,
  updateTour,
} from "../controllers/tourController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

// all routes
router.get("/search", getToursBySearch);
router.get("/", getTours);

router.get("/userTours/:id", auth, getToursByUser);
router.post("/addtour", auth, createTour);
router.patch("/:id", auth, updateTour);
router.delete("/:id", auth, deleteTour);

export default router;
