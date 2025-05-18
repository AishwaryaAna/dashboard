import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from './assets/background.png.png';

const BackgroundContainer = styled('div')(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed', // Ensures the background image covers the entire viewport
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  overflow: 'hidden', // Prevents any overflow that might cause unwanted scrollbars
}));

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log('Login attempt with:', formData);
      navigate('/dashboard'); // Redirect to dashboard after login
    } else {
      // Handle registration logic
      if (formData.password === formData.confirmPassword) {
        console.log('Registration attempt with:', formData);
        // Redirect to login or dashboard after registration
        setIsLogin(true);
      } else {
        alert('Passwords do not match');
      }
    }
  };

  return (
    <BackgroundContainer>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Tabs value={isLogin ? 0 : 1} onChange={(e, newValue) => setIsLogin(newValue === 0)} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
            />
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Box>
      </Paper>
    </BackgroundContainer>
  );
};

export default Login;









