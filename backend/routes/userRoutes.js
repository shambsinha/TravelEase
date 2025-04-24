import express from 'express';
import Clerk from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

const router = express.Router();

// GET user profile
router.get('/profile', async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const clerkUser = await Clerk.users.getUser(clerkId);
    const email = clerkUser.emailAddresses[0]?.emailAddress || "";
    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

    let user = await User.findOne({ clerkId });

    if (!user) {
      const role = email === "admin@example.com" ? "admin" : "customer";
      user = new User({ clerkId, name, email, role });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT user profile (update info)
// router.put('/profile', async (req, res) => {
//   try {
//     const clerkId = req.auth.userId;

//     const user = await User.findOneAndUpdate(
//       { clerkId },
//       { $set: req.body },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

export default router;