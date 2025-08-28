const express = require("express");
const router = express.Router();
const { createMatch, getMatches } = require("../controllers/matchController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.post("/", protect, restrictTo("admin"), createMatch);
router.get("/", getMatches);

module.exports = router;
