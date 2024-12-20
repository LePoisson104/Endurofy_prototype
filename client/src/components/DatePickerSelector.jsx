import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { textFieldStyles } from "../pages/profile/TextFieldStyles";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const DatePickerSelector = ({ date, setDate, label }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newDate) => setDate(newDate)}
        renderInput={(params) => <TextField {...params} fullWidth />}
        sx={{ ...textFieldStyles }}
        slotProps={{
          popper: {
            sx: {
              "& .MuiPaper-root": {
                bgcolor: colors.primary[400],
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerSelector;
