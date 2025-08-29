const express = require("express");
const Match = require("../models/Match");

const router = express.Router();

// ✅ Create Match
router.post("/", async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.json({ status: "success", message: "Match created successfully", data: match });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

// ✅ Get All Matches (with pagination)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const matches = await Match.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ status: "success", data: matches });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

// ✅ Update Match
router.put("/:id", async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) return res.status(404).json({ status: "error", message: "Match not found", data: null });
    res.json({ status: "success", message: "Match updated successfully", data: match });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

// ✅ Delete Match
router.delete("/:id", async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ status: "error", message: "Match not found", data: null });
    res.json({ status: "success", message: "Match deleted successfully", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

module.exports = router;
