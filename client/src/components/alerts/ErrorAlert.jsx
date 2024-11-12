import { Box, Alert } from "@mui/material";
import { useRef } from "react";
import { slideDownUpFade } from "./slideDownUpFade";

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
        animation: `${slideDownUpFade} ${duration}ms ease-in-out`,
        animationFillMode: "forwards", // Keeps the element in its final state
      }}
    >
      <Alert severity="error">{message}</Alert>
    </Box>
  );
};

export default ErrorAlert;
