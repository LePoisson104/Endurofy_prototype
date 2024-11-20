import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const ColorSelector = ({
  open,
  setOpen,
  avatarBgColor,
  setAvatarBgColor,
  setAnchorEl,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Temporary state for the selected color
  const [selectedColor, setSelectedColor] = useState(avatarBgColor);

  const colorTheme = [
    "#6d76fa", // default purple
    "#673ab7", // Purple
    "#2196f3", // Blue
    "#4caf50", // Green
    "#fdd835", // Yellow
    "#ff9800", // Orange
    "#f44336", // Red
  ];

  const handleClose = () => setOpen(false);

  const handleColorChange = (color) => {
    setSelectedColor(color); // Update the temporary selected color
  };

  const handleApply = () => {
    setAvatarBgColor(selectedColor); // Apply the selected color
    handleClose(); // Close the modal
    setAnchorEl(null);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor:
              theme.palette.mode === "dark" ? colors.primary[500] : "#f5f5f5", // Adjust background based on theme
          },
        }}
      >
        <DialogTitle>Choose a background color</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            {colorTheme.map((color) => (
              <Grid item key={color}>
                <Box
                  onClick={() => handleColorChange(color)} // Update selected color
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: color,
                    borderRadius: "50%",
                    cursor: "pointer",
                    boxShadow:
                      selectedColor === color
                        ? `0 0 0 2px ${
                            theme.palette.mode === "dark" ? "white" : "black"
                          }`
                        : "none",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "none", color: "#6d76fa" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply} // Apply the color on click
            sx={{
              textTransform: "none",
              bgcolor: colors.purpleAccent[400],
              color: "white",
              "&:hover": {
                bgcolor: colors.purpleAccent[300],
              },
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ColorSelector;
