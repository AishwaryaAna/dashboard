import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Typography, Card, Snackbar,
  Alert, LinearProgress, Box, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LeetCode() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/fetch', { username });
      setStats(res.data);
      setError('');
    } catch {
      setStats(null);
      setError('Failed to fetch stats. Make sure the username is correct.');
    } finally {
      setLoading(false);
    }
  };

  const saveStats = async () => {
    if (!stats) return;
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/save', stats);
      setSnackbar({ open: true, message: 'Saved to Student List!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to save. Try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const goToStudentList = () => {
    navigate('/students');
  };

  const resetStats = () => {
    setUsername('');
    setStats(null);
    setError('');
  };

  const total = stats ? stats.easySolved + stats.mediumSolved + stats.hardSolved : 0;

  const getBadge = (total) => {
    if (total >= 500) return { emoji: '🏆', text: 'Legend Solver' };
    if (total >= 300) return { emoji: '🔥', text: 'Pro Solver' };
    if (total >= 100) return { emoji: '💪', text: 'Active Solver' };
    return { emoji: '🌱', text: 'Beginner' };
  };

  const badge = stats ? getBadge(total) : null;

  return (
    <div style={{
      background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite',
      minHeight: '100vh',
      paddingTop: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start',
    }}>
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Container maxWidth="sm">
        <Card
          sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            p: 4,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="#ffffff">
            🚀 LeetCode Tracker
          </Typography>

          <TextField
            label="LeetCode Username"
            variant="filled"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 2,
              input: { color: 'white' },
              label: { color: 'white' },
              bgcolor: 'rgba(255,255,255,0.1)',
              borderRadius: 1,
            }}
          />

          <Button variant="contained" onClick={fetchStats} disabled={loading} fullWidth sx={{ mb: 2 }}>
            {loading ? 'Fetching...' : 'Fetch Status'}
          </Button>

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {stats && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" color="white" gutterBottom>
                Status for {stats.username}
              </Typography>

              <Typography color="white">Total Solved: {stats.totalSolved}</Typography>
              <Chip
                label={`${badge.emoji} ${badge.text}`}
                color="primary"
                sx={{ mt: 1, mb: 2, bgcolor: 'rgba(0,0,0,0.4)', color: 'white' }}
              />

              <Typography fontStyle="italic" color="white" gutterBottom>
                “Every problem you solve is a step closer to mastery.” 💡
              </Typography>

              <Box sx={{ my: 2 }}>
                <Typography color="white">Easy: {stats.easySolved}</Typography>
                <LinearProgress value={(stats.easySolved / total) * 100} variant="determinate" sx={{ height: 8, borderRadius: 5, mb: 1 }} />

                <Typography color="white">Medium: {stats.mediumSolved}</Typography>
                <LinearProgress value={(stats.mediumSolved / total) * 100} variant="determinate" sx={{ height: 8, borderRadius: 5, mb: 1 }} />

                <Typography color="white">Hard: {stats.hardSolved}</Typography>
                <LinearProgress value={(stats.hardSolved / total) * 100} variant="determinate" sx={{ height: 8, borderRadius: 5 }} />
              </Box>

              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={saveStats}
                  disabled={loading}
                  sx={{
                    bgcolor: '#00bfa5',
                    '&:hover': { bgcolor: '#009e8f' },
                    color: 'white',
                  }}
                >
                  💾 Save
                </Button>

                <Button
                  variant="contained"
                  onClick={goToStudentList}
                  sx={{
                    bgcolor: '#2979ff',
                    '&:hover': { bgcolor: '#1565c0' },
                    color: 'white',
                  }}
                >
                  📋 Go to Student List
                </Button>

                <Button
                  variant="contained"
                  onClick={resetStats}
                  sx={{
                    bgcolor: '#ff7043',
                    '&:hover': { bgcolor: '#e64a19' },
                    color: 'white',
                  }}
                >
                  ♻️ Reset
                </Button>
              </Box>
            </Box>
          )}
        </Card>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} variant="filled" onClose={handleCloseSnackbar}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default LeetCode;
