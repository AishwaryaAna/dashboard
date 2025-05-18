// leetcode.js
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const router = express.Router();

// Mongoose Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  totalSolved: Number,
  easySolved: Number,
  mediumSolved: Number,
  hardSolved: Number,
  totalEasy: Number,
  totalMedium: Number,
  totalHard: Number,
});

const User = mongoose.model("User", userSchema);

// GraphQL query
const leetcodeQuery = (username) => ({
  query: `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `,
  variables: { username },
});

// POST /api/leetcode
router.post("/", async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      leetcodeQuery(username),
      { headers: { "Content-Type": "application/json" } }
    );

    const stats = response.data.data?.matchedUser?.submitStats?.acSubmissionNum;

    if (!stats) {
      return res.status(404).json({ error: "User not found or data unavailable" });
    }

    const easy = stats.find((d) => d.difficulty === "Easy") || { count: 0 };
    const medium = stats.find((d) => d.difficulty === "Medium") || { count: 0 };
    const hard = stats.find((d) => d.difficulty === "Hard") || { count: 0 };
    const total = stats.find((d) => d.difficulty === "All") || { count: 0 };

    const totalEasy = 876;
    const totalMedium = 1840;
    const totalHard = 833;

    const userData = {
      username,
      totalSolved: total.count,
      easySolved: easy.count,
      mediumSolved: medium.count,
      hardSolved: hard.count,
      totalEasy,
      totalMedium,
      totalHard,
    };

    const savedUser = await User.findOneAndUpdate(
      { username },
      userData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(savedUser);
  } catch (err) {
    console.error("Error fetching LeetCode data:", err.message);
    res.status(500).json({ error: "Failed to fetch data from LeetCode" });
  }
});

// GET /api/leetcode/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;

