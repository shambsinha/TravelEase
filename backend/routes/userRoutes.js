import express from "express";
// import { requireAuth } from "@clerk/clerk-sdk-node";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({  });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { },
      { $set: req.body },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;