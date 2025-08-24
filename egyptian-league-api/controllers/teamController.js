const Team = require("../models/team");
const { success, fail } = require("../utils/jsend");

exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.json(success(team, "Team created successfully"));
  } catch (err) {
    res.status(400).json(fail(null, err.message));
  }
};

exports.getTeams = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teams = await Team.find().skip(skip).limit(limit);
    const total = await Team.countDocuments();

    res.json(
      success({ teams, total, page, totalPages: Math.ceil(total / limit) })
    );
  } catch (err) {
    res.status(500).json(fail(null, err.message));
  }
};

exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json(fail(null, "Team not found"));
    res.json(success(team));
  } catch {
    res.status(400).json(fail(null, "Invalid Team ID"));
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) return res.status(404).json(fail(null, "Team not found"));
    res.json(success(team, "Team updated successfully"));
  } catch {
    res.status(400).json(fail(null, "Invalid Team ID"));
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json(fail(null, "Team not found"));
    res.json(success(null, "Team deleted successfully"));
  } catch {
    res.status(400).json(fail(null, "Invalid Team ID"));
  }
};
