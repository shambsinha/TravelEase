import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: String, ref: "User", required: true },
  package: { type: Number, ref: "Package", required: true },
  guests: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model("Booking", bookingSchema);