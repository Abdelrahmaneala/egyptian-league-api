const Match = require("../models/Match");

// Create Match
exports.createMatch = async (req, res, next) => {
  try {
    const { homeTeam, awayTeam, matchDate, score } = req.body;
    if (!homeTeam || !awayTeam || !matchDate) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "homeTeam, awayTeam and matchDate are required",
      });
    }
    const match = await Match.create({ homeTeam, awayTeam, matchDate, score });
    res.status(201).json({ status: "success", data: match, message: "Match created successfully" });
  } catch (err) {
    next(err);
  }
};

// Get Matches (with pagination)
exports.getMatches = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const matches = await Match.find().populate("homeTeam awayTeam").skip(skip).limit(limit);
    res.json({ status: "success", data: matches, message: "Matches fetched successfully" });
  } catch (err) {
    next(err);
  }
};

// Update Match
exports.updateMatch = async (req, res, next) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) {
      return res.status(404).json({ status: "fail", data: null, message: "Match not found" });
    }
    res.json({ status: "success", data: match, message: "Match updated successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete Match
exports.deleteMatch = async (req, res, next) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ status: "fail", data: null, message: "Match not found" });
    }
    res.json({ status: "success", data: null, message: "Match deleted successfully" });
  } catch (err) {
    next(err);
  }
};
