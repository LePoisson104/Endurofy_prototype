import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

const MonthSelect = ({ month, setMonth, size = "large", bgcolor }) => {
  const handleChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size={size}>
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
            bgcolor: bgcolor,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#868dfb", // Border color on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#868dfb",
            },
          }}
        >
          <MenuItem value={"01"}>January</MenuItem>
          <MenuItem value={"02"}>February</MenuItem>
          <MenuItem value={"03"}>March</MenuItem>
          <MenuItem value={"04"}>April</MenuItem>
          <MenuItem value={"05"}>May</MenuItem>
          <MenuItem value={"06"}>June</MenuItem>
          <MenuItem value={"07"}>July</MenuItem>
          <MenuItem value={"08"}>August</MenuItem>
          <MenuItem value={"09"}>September</MenuItem>
          <MenuItem value={"10"}>October</MenuItem>
          <MenuItem value={"11"}>November</MenuItem>
          <MenuItem value={"12"}>December</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MonthSelect;
