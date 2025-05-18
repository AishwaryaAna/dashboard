import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export function CircularProgressWithLabel({ value }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        size={120}
        thickness={6}
        sx={{
          color: value > 70 ? "green" : value > 40 ? "orange" : "red"
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="div" color="text.secondary">
          {`${value}%`}
        </Typography>
      </Box>
    </Box>
  );
}
