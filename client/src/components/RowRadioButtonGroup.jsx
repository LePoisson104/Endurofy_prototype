import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const RowRadioButtonsGroup = () => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="male"
          control={
            <Radio
              sx={{
                color: "#6d76fa",
                "&.Mui-checked": {
                  color: "#6d76fa",
                },
              }}
            />
          }
          label="Male"
        />
        <FormControlLabel
          value="female"
          control={
            <Radio
              sx={{
                color: "#6d76fa",
                "&.Mui-checked": {
                  color: "#6d76fa",
                },
              }}
            />
          }
          label="Female"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RowRadioButtonsGroup;
