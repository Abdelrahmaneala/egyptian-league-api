const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images

// ================== MongoDB Connection ==================
mongoose
  .connect("mongodb://127.0.0.1:27017/egyptian-league")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ================== MODELS ==================
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: String,
  stadium: String,
  foundedYear: Number,
  logo: String, // ✅ new field for team logo
});
const Team = mongoose.model("Team", teamSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});
const User = mongoose.model("User", userSchema);

// ================== JWT Middleware ==================
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient role" });
      }

      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };
};

// ================== MULTER (File Upload) ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ================== AUTH ROUTES ==================

// Signup
app.post("/auth/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.json({ status: "success", message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Signup failed" });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ status: "success", token });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Login failed" });
  }
});

// ================== TEAM ROUTES ==================

// Get all teams (public)
app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json({
      status: "success",
      data: { teams, total: teams.length, page: 1, totalPages: 1 },
      message: "تمت العملية بنجاح",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Add new team (Admin only)
app.post("/teams", authMiddleware(["admin"]), async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.json({ status: "success", data: newTeam, message: "Team created" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to create team" });
  }
});

// Upload team logo (Admin only)
app.post(
  "/teams/:id/logo",
  authMiddleware(["admin"]),
  upload.single("logo"),
  async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) return res.status(404).json({ message: "Team not found" });

      team.logo = `/uploads/${req.file.filename}`;
      await team.save();

      res.json({
        status: "success",
        data: team,
        message: "Logo uploaded successfully",
      });
    } catch (err) {
      res.status(500).json({ status: "error", message: "Upload failed" });
    }
  }
);

// ================== SERVER START ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
