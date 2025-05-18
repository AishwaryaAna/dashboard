import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from './assets/background.png.png';

const LeetCodeTracker = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirecting after saving

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/leetcode", { username });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleSave = async () => {
    try {
      if (!username.trim()) {
        setError("Username is required");
        return;
      }
      await axios.post("http://localhost:4000/api/leetcode", { username });
      navigate("/students"); // Redirect to student list
    } catch (err) {
      setError("Failed to save user");
    }
  };

  const getPercent = (solved, total) =>
    total ? Math.round((solved / total) * 100) : 0;

  const totalProblems = 3549;

  return (
    <Box
      sx={{
        minHeight: "120vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
          bgcolor: "rgba(30,30,30,0.9)",
          color: "#eee",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          LeetCode Tracker
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} alignItems="center" justifyContent="center" mb={3}>
            <TextField
              label="LeetCode Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ bgcolor: "#333", borderRadius: 1 }}
              InputLabelProps={{ sx: { color: "#bbb" } }}
              inputProps={{ style: { color: "#eee" } }}
            />
            <Button type="submit" variant="contained" color="primary">
              Check
            </Button>
          </Box>
        </form>

        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

        {result && (
          <>
            <Typography textAlign="center" mb={3} fontSize={20}>
              <strong>{result.username}</strong> solved{" "}
              <strong>{result.totalSolved}</strong> problems
            </Typography>

            <Box sx={{ position: "relative", width: 160, height: 160, mx: "auto", mb: 3 }}>
              <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#444"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#4caf50"
                  strokeWidth="3"
                  strokeDasharray={`${getPercent(result.totalSolved, totalProblems)}, 100`}
                  strokeDashoffset="25"
                />
              </svg>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#eee",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {result.totalSolved}
                </Typography>
                <Typography fontSize={12} color="#aaa">
                  / {totalProblems} solved
                </Typography>
              </Box>
            </Box>

            {/* Save Button */}
            <Box textAlign="center" mb={2}>
              <Button variant="contained" color="success" onClick={handleSave}>
                Save to Student List
              </Button>
            </Box>
          </>
        )}

        <Box textAlign="center" mt={2}>
          <Button component={Link} to="/students" variant="outlined" color="secondary">
            View All Students
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LeetCodeTracker;
