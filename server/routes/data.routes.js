const express = require("express");

const { getScenarios, addScenario } = require("../controllers/data.controller");

const router = express.Router();

router.get('/', getScenarios)
router.post('/add', addScenario)

module.exports = router;