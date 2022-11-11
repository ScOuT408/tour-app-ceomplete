import Tour from "../models/Tour.js";
import mongoose from "mongoose";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new Tour({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTour.save();
    res.status(201).json({
      message: "Tour added successfully",
    });
  } catch (err) {
    console.log(err.msssage);
  }
};

export const getTours = async (req, res) => {
  try {
    const allTour = await Tour.find();
    res.status(200).json(allTour);
  } catch (err) {
    console.log(err.msssage);
  }
};

export const getToursByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exists" });
  }
  try {
    const userTours = await Tour.find({ creator: id });
    return res.status(200).json(userTours);
  } catch (err) {
    return res.status(404).json({ message: "No Tours Found" });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { name, addby, category, visitors, desc, imageFile } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }

    const updatedTour = {
      name,
      addby,
      visitors,
      category,
      desc,
      imageFile,
      _id: id,
    };
    await Tour.findByIdAndUpdate(id, updatedTour, { new: true });
    res.json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }

    const deletedTour = await Tour.findByIdAndDelete(id);
    res.status(200).json(deletedTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i");
    const tours = await Tour.find({ name });
    res.status(200).json(tours);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
