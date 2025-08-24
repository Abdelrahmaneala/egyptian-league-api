const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.post("/", teamController.createTeam);
router.get("/", teamController.getTeams);
router.get("/:id", teamController.getTeam);
router.put("/:id", teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
