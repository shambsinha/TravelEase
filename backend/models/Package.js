import mongoose from "mongoose";

const selectedPackageSchema = new mongoose.Schema({
  packageIds: [{ type: Number, required: true }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SelectedPackage", selectedPackageSchema);