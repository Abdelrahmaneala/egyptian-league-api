const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  matchDate: { type: Date, required: true },
  score: { type: String, default: "0-0" },
});

module.exports = mongoose.model("Match", matchSchema);
