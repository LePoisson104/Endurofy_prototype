import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";

const LoadingSpinner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 40, // Final position during the animation
        left: "50%",
        transform: "translateX(-50%)", // Center horizontally
        zIndex: 9999,
        animationFillMode: "forwards", // Keeps the element in its final state
      }}
    >
      <CircularProgress
        size={24}
        sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
      />
    </Box>
  );
};

export default LoadingSpinner;
