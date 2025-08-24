const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// اتصال بقاعدة البيانات MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/egyptian_league")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error(err));

// موديل الفرق
const teamSchema = new mongoose.Schema({
  name: String,
  city: String,
  points: { type: Number, default: 0 }
});
const Team = mongoose.model("Team", teamSchema);

// ✅ JSend Helper
const jsend = (status, data, message = null) => ({ status, data, message });

// 📌 Routes

// إضافة فريق جديد
app.post("/teams", async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.json(jsend("success", team));
  } catch (err) {
    res.status(500).json(jsend("error", null, err.message));
  }
});

// جلب جميع الفرق (مع Pagination)
app.get("/teams", async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const teams = await Team.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Team.countDocuments();
    res.json(jsend("success", { teams, total, page, limit }));
  } catch (err) {
    res.status(500).json(jsend("error", null, err.message));
  }
});

// تحديث بيانات فريق
app.put("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) return res.status(404).json(jsend("fail", null, "Team not found"));
    res.json(jsend("success", team));
  } catch (err) {
    res.status(500).json(jsend("error", null, err.message));
  }
});

// حذف فريق
app.delete("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json(jsend("fail", null, "Team not found"));
    res.json(jsend("success", team));
  } catch (err) {
    res.status(500).json(jsend("error", null, err.message));
  }
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json(jsend("error", null, err.message));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
