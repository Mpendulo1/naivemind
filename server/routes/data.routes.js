const express = require("express");

const { getScenarios, addScenario } = require("../controllers/data.controller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getScenarios);
router.post("/add", protect, addScenario);

module.exports = router;
