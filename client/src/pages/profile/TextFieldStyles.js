// textFieldStyles.js
export const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#868dfb", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#868dfb", // Border color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "grey", // Default label color
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#868dfb", // Label color when focused
  },
  // Hide the spinner arrows on input[type=number]
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
};
