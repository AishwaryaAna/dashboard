import {
  Typography,
  Box,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled, keyframes } from "@mui/system";
import CodingIcon from "./assets/coding-icon.png.png";

// Typing animation
const typing = keyframes`
  from { width: 0ch }
  to { width: 15ch }
`;

// Sidebar gradient background animation
const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Wrapper layout
const DashboardWrapper = styled(Box)(() => ({
  display: "flex",
  height: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
}));

// Sidebar styles with animated gradient
const Sidebar = styled(Box)(({ theme }) => ({
  width: "250px",
  background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
  backgroundSize: "400% 400%",
  animation: `${gradientBG} 15s ease infinite`,
  color: "white",
  padding: theme.spacing(3),
  borderRadius: "20px 0 0 20px",
  boxShadow: "2px 0 15px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  boxSizing: "border-box",
  position: "fixed",
}));

// Main content area
const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 250,
  flexGrow: 1,
  padding: theme.spacing(4),
  background: "#f4f0fa",
  color: "#333",
  overflowY: "auto",
  height: "100vh",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
}));

// Sidebar link items
const SidebarItem = styled(Typography)(() => ({
  marginBottom: 16,
  cursor: "pointer",
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1.1rem",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ffd700",
  },
}));

// Feature card styles
const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  background: "#fff",
  color: "#333",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "default",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
}));

const IconCircle = styled("div")(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(1),
}));

const Footer = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  padding: theme.spacing(3),
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
}));

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Sidebar>
        <img
          src={CodingIcon}
          alt="Coding Icon"
          width={150}
          height={150}
          style={{ borderRadius: "50%", marginBottom: 20 }}
        />
        <Box mb={3} position="relative" width="100%" textAlign="center">
          <Typography
            sx={{
              fontSize: "26px",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #ff8a00, #e52e71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "fit-content",
              animation: `${typing} 2s steps(15, end) forwards`,
              letterSpacing: "3px",
              textTransform: "uppercase",
              margin: "auto",
            }}
          >
            Code Tracker
          </Typography>
        </Box>

        <Divider sx={{ background: "#fff", width: "80%", my: 3 }} />
        <SidebarItem component={Link} to="/login">Login</SidebarItem>
        <SidebarItem component={Link} to="/leetcode">LeetCode Tracker</SidebarItem>
        <SidebarItem component={Link} to="/students">Students</SidebarItem>
      </Sidebar>

      <MainContent>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 5,
            borderRadius: 4,
            background: "#dcd0ff",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h3" gutterBottom>
            🎓 Master Your Coding Journey
          </Typography>
          <Typography variant="h6" mb={3}>
            Track your progress across <strong>LeetCode</strong>,{" "}
            <strong>HackerRank</strong>, and <strong>Codeforces</strong> in one unified dashboard.
          </Typography>
          <Typography variant="body1" mb={3}>
            🔒 Stay focused. 📈 Stay consistent. 🚀 Grow faster.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ background: "linear-gradient(90deg, #ff8a00, #e52e71)" }}
            component={Link}
            to="/leetcode"
          >
            Get Started Now
          </Button>
        </Paper>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }}
          gap={4}
        >
          <FeatureCard>
            <IconCircle>🧠</IconCircle>
            <Typography variant="h5" gutterBottom>Smart Tracking</Typography>
            <Typography variant="body2">
              Automatically sync solved problems from multiple platforms.
            </Typography>
          </FeatureCard>

          <FeatureCard>
            <IconCircle>📊</IconCircle>
            <Typography variant="h5" gutterBottom>Performance Insights</Typography>
            <Typography variant="body2">
              Visualize your daily, weekly, and monthly progress easily.
            </Typography>
          </FeatureCard>

          <FeatureCard>
            <IconCircle>🎯</IconCircle>
            <Typography variant="h5" gutterBottom>Goal Setting</Typography>
            <Typography variant="body2">
              Set personal milestones to stay on top of your game.
            </Typography>
          </FeatureCard>

          <FeatureCard>
            <IconCircle>🔔</IconCircle>
            <Typography variant="h5" gutterBottom>Reminders & Streak Alerts</Typography>
            <Typography variant="body2">
              Keep your streak alive with custom notifications.
            </Typography>
          </FeatureCard>

          <FeatureCard>
            <IconCircle>🌐</IconCircle>
            <Typography variant="h5" gutterBottom>Multi-Platform Support</Typography>
            <Typography variant="body2">
              Track progress across Codeforces, AtCoder, HackerEarth, and more.
            </Typography>
          </FeatureCard>

          <FeatureCard>
            <IconCircle>🛠️</IconCircle>
            <Typography variant="h5" gutterBottom>Customizable Dashboard</Typography>
            <Typography variant="body2">
              Personalize your dashboard with themes, layouts, and widgets.
            </Typography>
          </FeatureCard>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 5,
            mt: 7,
            borderRadius: 4,
            background: "#ffffff",
            color: "#333",
            textAlign: "center",
            boxShadow: "0 4px 25px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom>Why Use Code Tracker?</Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 2 }}>
            Keeping up with competitive programming is hard.{"\n"}
            Code Tracker brings everything into one place — no more switching tabs, no lost progress.{"\n"}
            Just consistent growth, beautifully visualized.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/about"
            sx={{ color: "#764ba2", borderColor: "#764ba2" }}
          >
            Learn More
          </Button>
        </Paper>

        <Footer>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Code Tracker. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Made with ❤️ by a passionate coder.
          </Typography>
        </Footer>
      </MainContent>
    </DashboardWrapper>
  );
};

export default Dashboard;


















