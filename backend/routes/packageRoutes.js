// import express from "express";
// import Package from "../models/Package.js"

// const router = express.Router();


// router.get("/", async (req, res) => {
//   try {
//     const packages = await Package.find();
//     res.json(packages);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


// router.get("/:id", async (req, res) => {
//   try {
//     const packageData = await Package.findById(req.params.id);
//     if (!packageData) return res.status(404).json({ message: "Package not found" });
//     res.json(packageData);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


// router.post("/", async (req, res) => {
//   try {
//     const newPackage = new Package(req.body);
//     await newPackage.save();
//     res.status(201).json(newPackage);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all packages
router.get("/", async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ packageIds: user.packageIds });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a package by ID
router.get("/:id", async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    if (!packageData) return res.status(404).json({ message: "Package not found" });
    res.json(packageData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new package
router.post("/", async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;