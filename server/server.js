const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbconn");

const modelRoutes = require("./routes/model.routes");
const dataRoutes = require("./routes/data.routes");
const authRoutes = require("./routes/auth.routes");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/models", modelRoutes);
app.use("/scenarios", dataRoutes);

connectDB();
app.listen(PORT, () => console.log(`Sever listening on port ${PORT}`));
