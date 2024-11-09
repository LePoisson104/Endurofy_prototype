import { CircularProgress, Box, Typography } from "@mui/material";

const CircularProgressBar = ({ value }) => {
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
        thickness={3}
        sx={{
          color: "#e2e6fc",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={100}
        thickness={5}
        sx={{
          color: "#9a9ff1",
          position: "absolute",
          left: 0,
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round", // Make the ends rounded
          },
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
          variant="h4"
          component="div"
          color="textSecondary"
          fontWeight="bold"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressBar;
