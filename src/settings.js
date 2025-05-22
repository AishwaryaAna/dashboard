import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const Settings = () => {
  // States for switches and fields
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState("Coder123");
  const [email, setEmail] = useState("coder@example.com");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDarkModeChange = (e) => setDarkMode(e.target.checked);
  const handleNotificationsChange = (e) => setNotifications(e.target.checked);

  const handleDeleteAccount = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
    alert("Account deletion process initiated.");
    // Add your delete account logic here
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, mb: 6, px: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "700", mb: 4 }}>
        Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Profile Management
        </Typography>

        <Box display="flex" alignItems="center" mb={3}>
          <Avatar sx={{ width: 64, height: 64, mr: 2 }}>C</Avatar>
          <label htmlFor="upload-photo">
            <input
              accept="image/*"
              id="upload-photo"
              type="file"
              style={{ display: "none" }}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        <TextField
          label="Username"
          value={username}
          fullWidth
          margin="normal"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Email"
          value={email}
          type="email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>

        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleDarkModeChange} />}
          label="Dark Mode"
        />

        <FormControlLabel
          control={
            <Switch checked={notifications} onChange={handleNotificationsChange} />
          }
          label="Enable Notifications & Streak Alerts"
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Account Security
        </Typography>

        <Button variant="outlined" sx={{ mb: 2 }}>
          Change Password
        </Button>
        <br />
        <Button variant="outlined" sx={{ mb: 2 }}>
          Enable Two-Factor Authentication (2FA)
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Platform Sync Settings
        </Typography>

        <Typography variant="body2" mb={2}>
          Link or unlink your coding platform accounts:
        </Typography>
        <Button variant="contained" sx={{ mr: 2, mb: 1 }}>
          Connect LeetCode
        </Button>
        <Button variant="contained" sx={{ mr: 2, mb: 1 }}>
          Connect Codeforces
        </Button>
        <Button variant="contained" sx={{ mr: 2, mb: 1 }}>
          Connect HackerRank
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 5, bgcolor: "#ffe6e6" }}>
        <Typography variant="h6" gutterBottom color="error">
          Delete Account
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Warning: This action is irreversible. All your data will be permanently deleted.
        </Typography>

        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Delete My Account
        </Button>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your account? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
