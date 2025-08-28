const Match = require("../models/Match");

exports.createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.json({ status: "success", data: match });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getMatches = async (req, res) => {
  const matches = await Match.find().populate("homeTeam awayTeam");
  res.json({ status: "success", data: matches });
};
