import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Paper, Tabs, Tab, Snackbar, Alert
} from '@mui/material';
import { styled } from '@mui/system';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const GradientBackground = styled('div')(() => ({
  background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
  backgroundSize: '400% 400%',
  animation: 'gradientBG 15s ease infinite',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px',
  '@keyframes gradientBG': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  }
}));

const GlassCard = styled(Paper)(() => ({
  padding: '32px',
  maxWidth: '400px',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  color: '#ffffff',
}));

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        localStorage.setItem('currentUser', JSON.stringify(user));
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setSnackbar({ open: true, message: 'Invalid email or password.', severity: 'error' });
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setSnackbar({ open: true, message: 'Passwords do not match.', severity: 'error' });
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(u => u.email === formData.email)) {
        setSnackbar({ open: true, message: 'Email already registered.', severity: 'error' });
        return;
      }

      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
      setIsLogin(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <GradientBackground>
      <GlassCard elevation={3}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          {isLogin ? '🔐 Welcome Back' : '👋 Join Us'}
        </Typography>

        <Tabs
          value={isLogin ? 0 : 1}
          onChange={(e, newValue) => setIsLogin(newValue === 0)}
          centered
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="filled"
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#fff' } }}
          />

          {!isLogin && (
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="filled"
              InputProps={{ style: { color: '#fff' } }}
              InputLabelProps={{ style: { color: '#fff' } }}
            />
          )}

          {isLogin && (
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="filled"
              InputProps={{ style: { color: '#fff' } }}
              InputLabelProps={{ style: { color: '#fff' } }}
            />
          )}

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="filled"
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#fff' } }}
          />

          {!isLogin && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="filled"
              InputProps={{ style: { color: '#fff' } }}
              InputLabelProps={{ style: { color: '#fff' } }}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: isLogin ? '#00bfa5' : '#2979ff',
              '&:hover': { bgcolor: isLogin ? '#009e8f' : '#1565c0' },
              color: 'white'
            }}
            startIcon={isLogin ? <LoginIcon /> : <PersonAddIcon />}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2, fontStyle: 'italic', color: 'white' }}>
          “Believe in yourself. You're capable of more than you think.” 🌟
        </Typography>
      </GlassCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </GradientBackground>
  );
};

export default Login;













