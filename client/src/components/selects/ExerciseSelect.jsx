import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useEffect } from "react";

const ExerciseSelect = ({
  exerciseCategory,
  setExerciseCategory,
  size = "large",
  bgcolor,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (e) => {
    setExerciseCategory(e.target.value);
  };

  useEffect(() => {
    setExerciseCategory("");
  }, []);

  return (
    <Box sx={{ minWidth: 120, marginTop: 1 }}>
      <FormControl fullWidth size={size}>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? colors.grey[400]
                : colors.grey[600], // Use a lighter shade from your theme
            "&.Mui-focused": {
              color: "#868dfb",
            },
          }}
        >
          Exercise Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={exerciseCategory}
          label="Exercise Category"
          onChange={handleChange}
          sx={{
            bgcolor: bgcolor,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#868dfb", // Border color on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#868dfb",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: colors.primary[400], // Background color for the dropdown
              },
            },
          }}
        >
          <MenuItem value={"Upper Chest"}>Upper Chest</MenuItem>
          <MenuItem value={"Mid Chest"}>Mid Chest</MenuItem>
          <MenuItem value={"Lower Chest"}>Lower Chest</MenuItem>
          <MenuItem value={"Triceps"}>Triceps</MenuItem>
          <MenuItem value={"Front Delts"}>Front Delts</MenuItem>
          <MenuItem value={"Lateral Delts"}>Lateral Delts</MenuItem>
          <MenuItem value={"Rear Delts"}>Rear Delts</MenuItem>
          <MenuItem value={"Lats"}>Lats</MenuItem>
          <MenuItem value={"Mid Back"}>Mid Back</MenuItem>
          <MenuItem value={"Biceps"}>Biceps</MenuItem>
          <MenuItem value={"Quads"}>Quads</MenuItem>
          <MenuItem value={"Hamstrings"}>Hamstrings</MenuItem>
          <MenuItem value={"Adductors"}>Adductors</MenuItem>
          <MenuItem value={"Abductors"}>Abductors</MenuItem>
          <MenuItem value={"Calves"}>Calves</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ExerciseSelect;
