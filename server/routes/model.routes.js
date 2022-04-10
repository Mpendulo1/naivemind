const express = require("express");

const { getModel, getModels } = require("../controllers/model.controller");

const router = express.Router();

router.get('/:id', getModel)
router.get('/models', getModels)
module.exports = router;