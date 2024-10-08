import { useState } from "react";
import { Typography, Popover, Box, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const BMIPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{
            paddingTop: 2,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          <span style={{ fontWeight: "bold" }}>Underweight:</span> BMI less than
          18.5.
        </Typography>
        <Typography
          sx={{
            paddingTop: 2,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          <span style={{ fontWeight: "bold" }}>Normal Weight:</span> BMI 18.5 to
          24.9
        </Typography>
        <Typography
          sx={{
            paddingTop: 2,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          <span style={{ fontWeight: "bold" }}>Overweight:</span> BMI 25 to 29.9
        </Typography>
        <Typography
          sx={{
            paddingTop: 2,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          <span style={{ fontWeight: "bold" }}>Obesity (Class 1):</span> BMI 30
          to 34.9
        </Typography>
        <Typography
          sx={{
            paddingTop: 2,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          <span style={{ fontWeight: "bold" }}>Obesity (Class 2):</span> BMI 35
          to 39.9
        </Typography>
        <Typography
          sx={{
            p: 2,
          }}
        >
          <span style={{ fontWeight: "bold" }}>Severe Obesity (Class 3):</span>{" "}
          BMI 40 or higher
        </Typography>
      </Popover>
    </Box>
  );
};

export default BMIPopover;
