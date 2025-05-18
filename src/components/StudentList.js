import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid
} from "@mui/material";

const StudentList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/leetcode/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch student list");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#121212",
        color: "#eee",
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center" color="white">
        Saved LeetCode Users
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : users.length === 0 ? (
        <Typography textAlign="center">No users saved yet.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {users.map((user, idx) => (
            <Grid item key={idx} xs={12} sm={8} md={6}>
              <Card
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  p: 2,
                  borderLeft: "6px solid #42a5f5",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {user.username}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Solved Problems: {user.totalSolved}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StudentList;


