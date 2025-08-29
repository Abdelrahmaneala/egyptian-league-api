const express = require("express");
const multer = require("multer");
const Team = require("../models/Team");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Create Team
router.post("/", async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.json({ status: "success", message: "Team created successfully", data: team });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

// ✅ Get All Teams (with pagination)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const teams = await Team.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ status: "success", data: teams });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

// ✅ Update Team
router.put("/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) return res.status(404).json({ status: "error", message: "Team not found", data: null });
    res.json({ status: "success", message: "Team updated successfully", data: team });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

// ✅ Delete Team
router.delete("/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ status: "error", message: "Team not found", data: null });
    res.json({ status: "success", message: "Team deleted successfully", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

// ✅ Upload Logo
router.post("/:id/logo", upload.single("logo"), async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ status: "error", message: "Team not found", data: null });
    team.logo = `/uploads/${req.file.filename}`;
    await team.save();
    res.json({ status: "success", message: "Logo uploaded successfully", data: team });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

module.exports = router;
