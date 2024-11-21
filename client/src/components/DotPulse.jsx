import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const DotPulse = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: "8px",
            height: "8px",
            backgroundColor: colors.purpleAccent[400], // Customize the color
            borderRadius: "50%",
            margin: "0 4px",
            animation: `pulse 1.5s infinite ease-in-out`,
            animationDelay: `${index * 0.3}s`,
          }}
        />
      ))}

      {/* Keyframes for the animation */}
      <style>
        {`
          @keyframes pulse {
            0%, 80%, 100% {
              transform: scale(0);
            } 
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default DotPulse;
