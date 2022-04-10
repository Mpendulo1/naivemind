const express = require("express");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
const router = express.Router();

router.route('/api/model/:id')
    .get((req, res) => res.status(200).json({data: "metadata for model {id}"}))
router.route('/scenario/add')
    .post((req, res) => res.status(201).json({msg: "scenario saved to db"}))
router.route('/scenarios')
    .get((req, res) => res.status(200).json({data: "list of saved scenarios"}))

app.use(router);
app.listen(PORT, () => console.log(`Sever listening on port ${PORT}`));