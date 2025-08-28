const express = require("express");
const router = express.Router();
const { createTeam, getTeams } = require("../controllers/teamController");
const upload = require("../middleware/uploadMiddleware");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.post("/", protect, restrictTo("admin"), upload.single("logo"), createTeam);
router.get("/", getTeams);

module.exports = router;
