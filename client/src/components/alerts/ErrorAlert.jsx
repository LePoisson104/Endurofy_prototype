import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { keyframes } from "@emotion/react";
import { useRef } from "react";
// Define keyframes for sliding down, staying visible, and then sliding up with fade out
const slideDownUpFade = keyframes`
  0% {
    top: -100px;
    opacity: 0;
  }
  10% {
    top: 40px;
    opacity: 1;
  }
  90% {
    top: 40px;
    opacity: 1;
  }
  100% {
    top: -100px;
    opacity: 0;
  }
`;

const ErrorAlert = ({ message, duration, setErrMsg }) => {
  const alertRef = useRef(null); // Reference to the alert element

  // Animation end handler
  const handleAnimationEnd = () => {
    setErrMsg(""); // Hide the alert by resetting the error message
  };
  return (
    <Box
      ref={alertRef}
      onAnimationEnd={handleAnimationEnd}
      sx={{
        display: "flex",
        position: "fixed",
        top: -100, // Start off-screen
        left: "50%",
        transform: "translateX(-50%)", // Center horizontally
        zIndex: 9999,
        backgroundColor: "#e57373",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        animation: `${slideDownUpFade} ${duration}ms ease-in-out`,
        animationFillMode: "forwards", // Keeps the element in its final state
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ErrorIcon />
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
};

export default ErrorAlert;
