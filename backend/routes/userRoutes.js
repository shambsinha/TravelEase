import express from "express";
import { requireAuth } from "@clerk/clerk-sdk-node";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", requireAuth, async (req, res) => {
  try {
    console.log('showing user data',req.auth);
    const clerkId = req.auth.userId;
    const email = req.auth.sessionClaims.email;
    const name = req.auth.sessionClaims.name;

    let user = await User.findOne({ clerkId });

    if (!user) {
      const role = email === "admin@example.com" ? "admin" : "customer";
      user = new User({ clerkId, name, email, role });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", requireAuth, async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;