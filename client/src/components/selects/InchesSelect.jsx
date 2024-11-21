import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const InchesSelect = ({ inches, setInches, size = "large", bgcolor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (e) => {
    setInches(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth size={size}>
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
          value={inches}
          label="in"
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
          {[...Array(12).keys()].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default InchesSelect;
