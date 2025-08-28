const express = require("express");
const multer = require("multer");
const path = require("path");
const Team = require("../models/Team");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

router.post("/", async (req, res) => {
  try {
    const { name, city, stadium } = req.body;
    const team = new Team({ name, city, stadium });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: "خطأ أثناء إنشاء الفريق" });
  }
});

router.post("/:id/logo", upload.single("logo"), async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ status: "error", message: "الفريق غير موجود" });
    }

    team.logo = `/uploads/${req.file.filename}`;
    await team.save();

    res.json({
      status: "success",
      data: team,
      message: "تم رفع اللوجو وتحديث بيانات الفريق"
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "حصل خطأ أثناء رفع اللوجو" });
  }
});

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "خطأ أثناء جلب الفرق" });
  }
});

module.exports = router;
