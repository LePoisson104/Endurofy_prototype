import { CircularProgress, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const CircularProgressBar = ({ value }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={100}
        size={100}
        thickness={4}
        sx={{
          color: theme.palette.mode == "dark" ? "white" : "#ffff",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={100}
        thickness={4}
        sx={{
          color: "#9a9ff1",
          position: "absolute",
          left: 0,
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="textSecondary"
          fontWeight="bold"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressBar;
