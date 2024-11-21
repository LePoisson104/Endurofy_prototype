import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { textFieldStyles } from "../../pages/profile/TextFieldStyles";
import ErrorAlert from "../alerts/ErrorAlert";

const EnergyTargetHelper = ({ open, handleClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [calories, setCalories] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false); // New state for the popup
  const [errMsg, setErrMsg] = useState("");

  const handleCalculate = () => {
    if (!age || !gender || !height || !weight || !activity) {
      return setErrMsg("Please fill in all fields.");
    }

    // Convert height to cm, weight to kg if needed
    const heightCm = parseFloat(height);
    const weightKg = parseFloat(weight);
    const ageYears = parseInt(age, 10);

    // Calculate BMR
    let BMR;
    if (gender === "Male") {
      BMR = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      BMR = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    // Calculate total calories based on activity level
    const activityFactor = parseFloat(activity);
    const totalCalories = Math.ceil(BMR * activityFactor);
    setCalories(totalCalories); // Rounded to 2 decimal places
    setPopupOpen(true); // Show the popup with the result
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  return (
    <>
      {errMsg && (
        <ErrorAlert message={errMsg} duration={3000} setErrMsg={setErrMsg} />
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor:
              theme.palette.mode === "dark" ? colors.primary[500] : "#f5f5f5", // Adjust background based on theme
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Calorie Calculator
          </Typography>

          {/* Age Input */}
          <TextField
            label="Age"
            type="number"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
            margin="normal"
            sx={{ ...textFieldStyles }}
          />

          {/* Gender Select */}
          <FormControl fullWidth margin="normal" sx={{ ...textFieldStyles }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: colors.primary[400], // Background color for the dropdown
                  },
                },
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>

          {/* Height Input */}
          <TextField
            label="Height (cm)"
            type="number"
            fullWidth
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            margin="normal"
            sx={{ ...textFieldStyles }}
          />

          {/* Weight Input */}
          <TextField
            label="Weight (kg)"
            type="number"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            margin="normal"
            sx={{ ...textFieldStyles }}
          />

          {/* Activity Level Select */}
          <FormControl fullWidth margin="normal" sx={{ ...textFieldStyles }}>
            <InputLabel id="activity-label">Activity Level</InputLabel>
            <Select
              labelId="activity-label"
              id="activity"
              label="Activity Level"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: colors.primary[400], // Background color for the dropdown
                  },
                },
              }}
            >
              <MenuItem value="1.2">Sedentary (little or no exercise)</MenuItem>
              <MenuItem value="1.375">Lightly active (1-3 days/week)</MenuItem>
              <MenuItem value="1.55">
                Moderately active (3-5 days/week)
              </MenuItem>
              <MenuItem value="1.725">Very active (6-7 days/week)</MenuItem>
              <MenuItem value="1.9">
                Super active (very hard exercise/physical job)
              </MenuItem>
            </Select>
          </FormControl>

          {/* Calculate Button */}
          <Button
            fullWidth
            onClick={handleCalculate}
            sx={{
              mt: 2,
              bgcolor: colors.purpleAccent[400],
              color: "white",
              "&:hover": { bgcolor: colors.purpleAccent[200] },
            }}
          >
            Calculate
          </Button>
        </Box>
      </Modal>

      {/* Result Popup Dialog */}
      <Dialog
        open={popupOpen}
        onClose={handlePopupClose}
        PaperProps={{
          component: "form",
          sx: {
            bgcolor:
              theme.palette.mode === "dark" ? colors.primary[500] : "#f5f5f5", // Adjust background based on theme
          },
        }}
      >
        <DialogTitle variant="h4" fontWeight={"bold"}>
          Calorie Result
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="h5">
            <span style={{ fontWeight: "bold" }}>Maintain Weight: </span>{" "}
            {calories} kcal.
          </DialogContentText>
          <DialogContentText variant="h5">
            <span style={{ fontWeight: "bold" }}>
              Mild Weight Loss: (0.5 lb/week){" "}
            </span>{" "}
            {Math.ceil(calories * 0.92)} kcal.
          </DialogContentText>
          <DialogContentText variant="h5">
            <span style={{ fontWeight: "bold" }}>
              Weight Loss: (1 lb/week){" "}
            </span>{" "}
            {Math.ceil(calories * 0.84)} kcal.
          </DialogContentText>
          <DialogContentText variant="h5">
            <span style={{ fontWeight: "bold" }}>
              Extreme Weight Loss: (2 lbs/week){" "}
            </span>{" "}
            {Math.ceil(calories * 0.69)} kcal.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePopupClose}
            sx={{ color: colors.purpleAccent[400] }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EnergyTargetHelper;
