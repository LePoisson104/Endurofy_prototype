import { Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const FilterSelect = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [month, setMonth] = useState("");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            "&.Mui-focused": {
              color: "#868dfb",
            },
          }}
        >
          Month
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Month"
          onChange={handleChange}
          sx={{
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
          <MenuItem value={"Current Week"}>Current Week</MenuItem>
          <MenuItem value={"Last Week"}>Last Week</MenuItem>
          <MenuItem value={"This Month"}>This Month</MenuItem>
          <MenuItem value={"Show All"}>Show All</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSelect;
