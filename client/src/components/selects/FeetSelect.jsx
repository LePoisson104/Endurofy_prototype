import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Box } from "@mui/material";

const FeetSelect = () => {
  const [feet, setFeet] = useState("");

  const handleChange = (event) => {
    setFeet(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            "&.Mui-focused": {
              color: "#6d76fa",
            },
          }}
        >
          ft
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={feet}
          label="ft"
          onChange={handleChange}
          sx={{
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6d76fa", // Border color on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6d76fa",
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FeetSelect;
