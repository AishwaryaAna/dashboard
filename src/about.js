import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const About = () => {
  const features = [
    "Smart Tracking: Automatically sync your solved problems and stats across platforms.",
    "Performance Insights: Visualize your progress with easy-to-understand charts.",
    "Goal Setting: Stay motivated with personalized milestones.",
    "Reminders & Streak Alerts: Keep your momentum going with custom notifications.",
    "Multi-Platform Support: Seamlessly integrate all your favorite coding sites.",
    "Customizable Dashboard: Tailor your workspace with themes and widgets that fit your style.",
    "Community Challenges: Participate in group contests and coding marathons.",
    "Detailed Analytics: Track problem difficulty, topics, and your strongest areas.",
    "Dark/Light Mode Toggle: Choose your preferred theme for comfortable coding sessions.",
  ];

  return (
    <div
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        minHeight: "100vh",
        paddingTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 8,
          mb: 8,
          px: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.15)", 
            color: "#ffffff",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(10px)", 
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "900",
              letterSpacing: "3px",
              mb: 4,
              color: "linear-gradient(90deg, #ff8a00, #e52e71)",
              background: "linear-gradient(90deg, #ff8a00, #e52e71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 8px rgba(0,0,0,0.3)",
            }}
          >
            About Code Tracker
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.15rem", lineHeight: 1.7, color: "#f0f0f0" }}
          >
            <span
              style={{
                fontWeight: "700",
                background: "linear-gradient(90deg, #23a6d5, #23d5ab)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome to <strong>Code Tracker</strong>
         
            , your all-in-one companion for mastering competitive programming!   </span>
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.15rem", lineHeight: 1.7, color: "#f0f0f0" }}
          >
            <span
              style={{
                fontWeight: "700",
                background: "linear-gradient(90deg, #e73c7e, #ee7752)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              In today’s fast-paced coding world,
          
            tracking your progress across multiple platforms can be overwhelming. Code Tracker simplifies this by bringing your coding journey into one unified dashboard — from LeetCode and HackerRank to Codeforces and more.  </span>{" "}
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mt: 4,
              mb: 2,
              fontWeight: "700",
              background: "linear-gradient(90deg, #ff8a00, #e52e71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Key Features:
          </Typography>

          <List>
            {features.map((feature, i) => (
              <ListItem key={i} disableGutters>
                <ListItemIcon sx={{ color: "#23d5ab", minWidth: 32 }}>
                  <CheckCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={feature}
                  primaryTypographyProps={{
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    color: "#f0f0f0",
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.15rem", lineHeight: 1.7, color: "#f0f0f0" }}
          >
            Our mission is to help coders like you stay focused, consistent, and empowered to achieve your goals faster.
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.15rem", lineHeight: 1.7, color: "#f0f0f0" }}
          >
            Whether you’re preparing for interviews, competitions, or simply want to level up your skills, Code Tracker is designed to grow with you.
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.15rem", lineHeight: 1.7, color: "#f0f0f0" }}
          >
            Join thousands of passionate coders who trust Code Tracker to guide their coding journey. Let’s code smarter, not harder.
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{
              mt: 5,
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#23d5ab",
              textShadow: "0 0 8px rgba(0,0,0,0.3)",
            }}
          >
            Happy coding! 🚀
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default About;


