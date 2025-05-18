import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';

function StudentList() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load student list');
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <Container maxWidth="md" style={{ marginTop: 50, textAlign: 'center' }}>
      <CircularProgress />
    </Container>
  );

  if (error) return (
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      <Typography color="error">{error}</Typography>
    </Container>
  );

  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      <Typography variant="h4" gutterBottom>
        Student List
      </Typography>
      {students.length === 0 && <Typography>No students saved yet.</Typography>}
      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{student.username}</Typography>
                <Typography>Total Solved: {student.totalSolved}</Typography>
                <Typography>Easy: {student.easySolved}</Typography>
                <Typography>Medium: {student.mediumSolved}</Typography>
                <Typography>Hard: {student.hardSolved}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default StudentList;



