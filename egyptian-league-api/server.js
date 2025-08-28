const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/egyptian_league")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: String,
  stadium: String,
  foundedYear: Number,
  logo: { type: String }, 
});

const Team = mongoose.model("Team", teamSchema);

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access Denied, No Token" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || "secretkey");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not allowed to access this route" });
    }
    next();
  };
}

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads"));


app.post("/auth/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    res.json({ status: "success", message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ status: "success", token });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


app.get("/teams", async (req, res) => {
  const teams = await Team.find();
  res.json({
    status: "success",
    data: { teams, total: teams.length, page: 1, totalPages: 1 },
    message: "تمت العملية بنجاح",
  });
});

app.post("/teams", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.json({ status: "success", data: team, message: "Team created" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.post(
  "/teams/:id/logo",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("logo"),
  async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) return res.status(404).json({ message: "Team not found" });

      team.logo = `/uploads/${req.file.filename}`;
      await team.save();

      res.json({ status: "success", data: team, message: "Logo uploaded" });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
