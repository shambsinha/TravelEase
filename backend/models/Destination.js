import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  images: [{ type: String }],
  coordinates: { type: [Number], required: true },
  packages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Destination", destinationSchema);