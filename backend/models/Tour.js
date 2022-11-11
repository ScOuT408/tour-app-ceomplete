import mongoose from "mongoose";

const TourSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addby: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
  },
  visitors: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Tour = mongoose.model("Tour", TourSchema);
export default Tour;
