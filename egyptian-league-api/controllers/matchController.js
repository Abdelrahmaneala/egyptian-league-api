const Match = require("../models/match");
const { success, fail } = require("../utils/jsend");

// Create Match
exports.createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.json(success(match, "Match created successfully"));
  } catch (err) {
    res.status(400).json(fail(null, err.message));
  }
};

// Get Matches with Pagination
exports.getMatches = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const matches = await Match.find()
      .populate("homeTeam awayTeam")
      .skip(skip)
      .limit(limit);

    const total = await Match.countDocuments();

    res.json(
      success({ matches, total, page, totalPages: Math.ceil(total / limit) })
    );
  } catch (err) {
    res.status(500).json(fail(null, err.message));
  }
};

// Get Match by ID
exports.getMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate("homeTeam awayTeam");
    if (!match) return res.status(404).json(fail(null, "Match not found"));
    res.json(success(match));
  } catch {
    res.status(400).json(fail(null, "Invalid Match ID"));
  }
};

// Update Match
exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!match) return res.status(404).json(fail(null, "Match not found"));
    res.json(success(match, "Match updated successfully"));
  } catch {
    res.status(400).json(fail(null, "Invalid Match ID"));
  }
};

// Delete Match
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json(fail(null, "Match not found"));
    res.json(success(null, "Match deleted successfully"));
  } catch {
    res.status(400).json(fail(null, "Invalid Match ID"));
  }
};
