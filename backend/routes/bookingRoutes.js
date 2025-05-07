import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });
    if(!user) return res.status(404).json({ message: "user not found"});
    const bookings = await Booking.find({ user: user.id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { packageId, guests, totalPrice, name, email } = req.body;
    console.log(req.body);
    console.log(req.auth.userId);
    const clerkId = req.auth.userId;
    const existingUser = await User.findOne({ clerkId });
    const newBooking = new Booking({
      user: existingUser._id,
      packageId: packageId,
      guests,
      totalPrice,
      name,
      email,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error hai" });
    console.error(error);
  }
});

export default router;