const Team = require("../models/Team");

exports.createTeam = async (req, res, next) => {
  try {
    const { name, city, stadium, foundedYear } = req.body;
    if (!name || !city || !stadium || !foundedYear) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "All fields are required",
      });
    }
    const team = await Team.create({ name, city, stadium, foundedYear });
    res.status(201).json({ status: "success", data: team, message: "Team created successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getTeams = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const teams = await Team.find().skip(skip).limit(limit);
    res.json({ status: "success", data: teams, message: "Teams fetched successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updateTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) {
      return res.status(404).json({ status: "fail", data: null, message: "Team not found" });
    }
    res.json({ status: "success", data: team, message: "Team updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ status: "fail", data: null, message: "Team not found" });
    }
    res.json({ status: "success", data: null, message: "Team deleted successfully" });
  } catch (err) {
    next(err);
  }
};
