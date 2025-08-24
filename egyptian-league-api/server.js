const express = require("express");
const mongoose = require("mongoose");
const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();
app.use(express.json());

const { success, fail, error } = require("./utils/jsend");

app.use("/teams", teamRoutes);
app.use("/matches", matchRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(error("Internal Server Error"));
});

app.use((req, res) => {
  res.status(404).json(fail(null, "Route not found"));
});

mongoose
  .connect("mongodb://127.0.0.1:27017/egyptian_league")
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(3000, () => console.log("Server running on port 3000 🚀"));
  })
  .catch((err) => console.error("DB Connection Error:", err));
