import express from "express";
import Review from "../models/Review.js";
// import { requireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.get("/:packageId", async (req, res) => {
  try {
    const reviews = await Review.find({ package: req.params.packageId }).populate("user", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { packageId, rating, comment } = req.body;
    const newReview = new Review({
      user: req.auth.userId,
      package: packageId,
      rating,
      comment,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;