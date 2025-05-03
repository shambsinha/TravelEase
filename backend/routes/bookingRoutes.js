import express from "express";
import Booking from "../models/Booking.js";
// import { requireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.auth.userId }).populate("package");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { packageId, guests, totalPrice } = req.body;
    const newBooking = new Booking({
      user: req.auth.userId,
      package: packageId,
      guests,
      totalPrice,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;