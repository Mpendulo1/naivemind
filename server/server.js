const express = require("express");
const dotenv = require("dotenv").config();

const modelRoutes = require("./routes/model.routes");
const dataRoutes = require("./routes/data.routes");

const PORT = process.env.PORT || 5000;

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/models', modelRoutes)
app.use('/scenarios', dataRoutes)
app.use(router);
app.listen(PORT, () => console.log(`Sever listening on port ${PORT}`));