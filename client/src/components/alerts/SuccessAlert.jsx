import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@emotion/react";
import { useRef } from "react";

// Define keyframes for sliding down, pausing, and then sliding up
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

const SuccessAlert = ({ message, duration, setSuccessMsg }) => {
  const alertRef = useRef(null); // Reference to the alert element

  // Animation end handler
  const handleAnimationEnd = () => {
    setSuccessMsg(""); // Hide the alert by resetting the error message
  };

  return (
    <Box
      ref={alertRef}
      onAnimationEnd={handleAnimationEnd}
      sx={{
        display: "flex",
        position: "fixed",
        top: 40, // Final position during the animation
        left: "50%",
        transform: "translateX(-50%)", // Center horizontally
        zIndex: 9999,
        backgroundColor: "#4caf50",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow
        animation: `${slideDownUpFade} ${duration}ms ease-in-out`, // Play the entire animation within the duration
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
        <CheckCircleIcon />
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
};

export default SuccessAlert;
