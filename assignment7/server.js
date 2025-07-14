// server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const users = require("./users");
const authenticateToken = require("./authMiddleware");

const app = express();
app.use(express.json());

// Login route (generate JWT)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, you accessed protected data.` });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
