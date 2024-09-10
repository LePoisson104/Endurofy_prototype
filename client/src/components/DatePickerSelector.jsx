import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { textFieldStyles } from "../pages/profile/TextFieldStyles";

const DatePickerSelector = ({ date, setDate, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newDate) => setDate(newDate)}
        renderInput={(params) => <TextField {...params} fullWidth />}
        sx={{ ...textFieldStyles }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerSelector;
