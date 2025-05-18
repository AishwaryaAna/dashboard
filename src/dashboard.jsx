import {
  Typography,
  Box,
  Paper,
  Divider
} from "@mui/material";
import { Link } from 'react-router-dom';
import { styled, keyframes } from "@mui/system";
import CodingIcon from "./assets/coding-icon.png.png";
// Animations
const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  0% { opacity: 1 }
  50% { opacity: 0 }
  100% { opacity: 1 }
`;

// Layout
const DashboardWrapper = styled(Box)(() => ({
  display: "flex",
  height: "100vh",
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "250px",
  background: "#8e44ad",
  color: "white",
  padding: theme.spacing(3),
  borderRadius: "20px 0 0 20px",
  boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  boxSizing: "border-box"
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  background: "#f4f0fa",
  overflowY: "auto",
  height: "100vh",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column"
}));

const SidebarItem = styled(Typography)(() => ({
  marginBottom: 16,
  cursor: "pointer",
  color: "white",
  textDecoration: "none",
  "&:hover": {
    color: "#ffd700"
  }
}));

const FeatureCard = ({ icon, title, description }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: "#fff" }}>
    <Typography variant="h4" mb={1}>{icon}</Typography>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2">{description}</Typography>
  </Paper>
);

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Sidebar>
        <img
          src={CodingIcon}
          alt="Coding Icon"
          width={200}
          height={200}
          style={{ borderRadius: "50%" }}
        />
        <Box mt={2} mb={2} position="relative">
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #ff8a00, #e52e71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "fit-content",
              animation: `${typing} 2s steps(12, end) forwards`,
              letterSpacing: "2px",
              textTransform: "uppercase",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
                width: "3px",
                backgroundColor: "white",
                animation: `${blink} 0.8s step-end`,
                animationIterationCount: 2,
                visibility: "hidden"
              }
            }}
          >
            Code Tracker
          </Typography>
        </Box>
        <Divider sx={{ background: "#fff", width: "80%", my: 2 }} />
        <SidebarItem component={Link} to="/login">Login</SidebarItem>
        <SidebarItem component={Link} to="/dashboard">Dashboard</SidebarItem>
        <SidebarItem component={Link} to="/leetcode">LeetCode Tracker</SidebarItem>
        <SidebarItem component={Link} to="/students">Students</SidebarItem>
      </Sidebar>

      <MainContent>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: "#dcd0ff",
            textAlign: "center"
          }}
        >
          <Typography variant="h4" gutterBottom>
            🎓 Master Your Coding Journey
          </Typography>
          <Typography variant="h6" mb={2}>
            Track your progress across <strong>LeetCode</strong>, <strong>HackerRank</strong>,{" "}
            and <strong>Codeforces</strong> in one unified dashboard.
          </Typography>
          <Typography variant="body1">
            🔒 Stay focused. 📈 Stay consistent. 🚀 Grow faster.
          </Typography>
        </Paper>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={3}>
          <FeatureCard
            icon="🧠"
            title="Smart Tracking"
            description="Automatically sync solved problems from multiple platforms."
          />
          <FeatureCard
            icon="📊"
            title="Performance Insights"
            description="Visualize your daily, weekly, and monthly progress easily."
          />
          <FeatureCard
            icon="🎯"
            title="Goal Setting"
            description="Set personal milestones to stay on top of your game."
          />
          <FeatureCard
            icon="🔔"
            title="Reminders & Streak Alerts"
            description="Keep your streak alive with custom notifications."
          />
        </Box>

        <Paper
          elevation={3}
          sx={{ p: 4, mt: 5, borderRadius: 4, background: "#ffffff", textAlign: "center" }}
        >
          <Typography variant="h5" gutterBottom>
            Why Use Code Tracker?
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            Keeping up with competitive programming is hard.{"\n"}
            Code Tracker brings everything into one place — no more switching tabs, no lost progress.{"\n"}
            Just consistent growth, beautifully visualized.
          </Typography>
        </Paper>
      </MainContent>
    </DashboardWrapper>
  );
};

export default Dashboard;



