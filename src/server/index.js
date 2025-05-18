// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leetcodeRoutes = require("./leetcode"); // Import the router from leetcode.js

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/leetcodeApp")
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/leetcodeApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:");
  console.error(err.message);
  process.exit(1);
});
// Routes
app.use("/api/leetcode", leetcodeRoutes); // Mount route
app.get("/", (req, res) => res.send("Welcome to the LeetCode Tracker API!"));

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});







