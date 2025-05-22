import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, CircularProgress, Snackbar, Alert,
  Box, Card, Chip, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const getBadge = (total) => {
  if (total >= 500) return { emoji: "🏆", text: "Legend Solver" };
  if (total >= 300) return { emoji: "🔥", text: "Pro Solver" };
  if (total >= 100) return { emoji: "💪", text: "Active Solver" };
  return { emoji: "🌱", text: "Beginner" };
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/students");
      setStudents(data);
    } catch {
      setSnackbar({ open: true, message: "Failed to fetch students", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const deleteStudent = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setSnackbar({ open: true, message: "Student deleted", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to delete student", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite',
      minHeight: '100vh',
      paddingTop: '50px',
    }}>
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Card sx={{
        maxWidth: '95%',
        mx: 'auto',
        p: 4,
        borderRadius: 4,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="white" gutterBottom>
          📘 Student List
        </Typography>

        <Typography align="center" fontStyle="italic" color="white" mb={3}>
          “Every student’s journey matters—progress, not perfection.” 🌟
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress />
          </Box>
        )}

        <TableContainer component={Paper} sx={{ backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell align="center"><strong>Total</strong></TableCell>
                <TableCell align="center"><strong>Easy</strong></TableCell>
                <TableCell align="center"><strong>Medium</strong></TableCell>
                <TableCell align="center"><strong>Hard</strong></TableCell>
                <TableCell align="center"><strong>Badge</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => {
                const total = student.easySolved + student.mediumSolved + student.hardSolved;
                const badge = getBadge(total);

                return (
                  <TableRow key={student._id ?? student.id}>
                    <TableCell>{student.username}</TableCell>
                    <TableCell align="center">{total}</TableCell>
                    <TableCell align="center">{student.easySolved}</TableCell>
                    <TableCell align="center">{student.mediumSolved}</TableCell>
                    <TableCell align="center">{student.hardSolved}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${badge.emoji} ${badge.text}`}
                        sx={{ bgcolor: 'rgba(0,0,0,0.7)', color: 'white' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => deleteStudent(student._id ?? student.id)}
                        disabled={loading}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!students.length && !loading && (
                <TableRow>
                  <TableCell colSpan={7} align="center">No students found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={fetchStudents}
            disabled={loading}
            sx={{
              bgcolor: '#00bfa5',
              '&:hover': { bgcolor: '#009e8f' },
              color: 'white'
            }}
          >
            🔄 Refresh
          </Button>

          <Button
            variant="contained"
            onClick={() => window.location.href = '/dashboard'}
            sx={{
              bgcolor: '#2979ff',
              '&:hover': { bgcolor: '#1565c0' },
              color: 'white'
            }}
          >
            ⬅️ Back to Dashboard
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Card>
    </div>
  );
};

export default StudentList;








