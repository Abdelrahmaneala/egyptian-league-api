const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  logo: { type: String }, // ✅ مضاف عشان التاسك الأخير
});

module.exports = mongoose.model("Team", teamSchema);
