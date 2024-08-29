import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Box } from "@mui/material";

const InchesSelect = () => {
  const [inch, setInch] = useState("");

  const handleChange = (event) => {
    setInch(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            "&.Mui-focused": {
              color: "#868dfb",
            },
          }}
        >
          in
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inch}
          label="in"
          onChange={handleChange}
          sx={{
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#868dfb", // Border color on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#868dfb",
            },
          }}
        >
          {[...Array(11).keys()].map((value) => (
            <MenuItem key={value + 1} value={value + 1}>
              {value + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default InchesSelect;
