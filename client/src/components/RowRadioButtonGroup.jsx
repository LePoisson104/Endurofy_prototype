import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const RowRadioButtonsGroup = ({ gender, setGender }) => {
  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={gender}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Male"
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
          value="Female"
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
