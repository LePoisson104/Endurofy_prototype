import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@emotion/react";
import { useEffect } from "react";

// Define keyframes for sliding down, pausing, and then sliding up
const slideDownUp = keyframes`
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
  useEffect(() => {
    // Set a timeout to call onClose after the specified duration
    const timeoutId = setTimeout(() => {
      setSuccessMsg("");
    }, duration);

    // Clean up the timeout if the component is unmounted before the timeout
    return () => clearTimeout(timeoutId);
  }, [duration, setSuccessMsg]);

  return (
    <Box
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
        animation: `${slideDownUp} ${duration}ms ease-in-out`, // Play the entire animation within the duration
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
