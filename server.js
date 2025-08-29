const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder to serve uploaded logos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/teams", teamRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/auth", authRoutes);

// Error Handling Middleware (JSend format)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Server Error",
    data: null,
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
