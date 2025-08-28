const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const teamRoutes = require("./routes/teamRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/teams", teamRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/egyptian_league")
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error(err));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
