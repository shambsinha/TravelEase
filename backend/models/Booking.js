import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  guests: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  paymentStatus: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
  bookedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);