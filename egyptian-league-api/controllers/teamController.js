const Team = require("../models/Team");

exports.createTeam = async (req, res) => {
  try {
    const { name, city } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    const team = new Team({ name, city, logo });
    await team.save();

    res.json({ status: "success", data: team });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getTeams = async (req, res) => {
  const teams = await Team.find();
  res.json({ status: "success", data: teams });
};
