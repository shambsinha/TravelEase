import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, 
  location: { type: String, required: true },
  coordinates: { type: [Number], required: true },
  images: [{ type: String }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Package", packageSchema);