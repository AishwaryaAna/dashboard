import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Typography, Card, CardContent,
} from '@mui/material';

function LeetCode() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/fetch', { username });
      setStats(res.data);
      setError('');
    } catch {
      setStats(null);
      setError('Failed to fetch stats. Make sure the username is correct.');
    }
  };

  const saveStats = async () => {
    try {
      await axios.post('http://localhost:5000/api/save', stats);
      alert('Saved!');
    } catch {
      alert('Failed to save');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="h4" gutterBottom>
        LeetCode Tracker
      </Typography>
      <TextField
        label="LeetCode Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button variant="contained" onClick={fetchStats}>
        Fetch Stats
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {stats && (
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h6">Stats for {stats.username}</Typography>
            <Typography>Total Solved: {stats.totalSolved}</Typography>
            <Typography>Easy: {stats.easySolved}</Typography>
            <Typography>Medium: {stats.mediumSolved}</Typography>
            <Typography>Hard: {stats.hardSolved}</Typography>
            <Button
              variant="outlined"
              style={{ marginTop: 10 }}
              onClick={saveStats}
            >
              Save to DB
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default LeetCode;
