// textFieldStyles.js
export const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#6d76fa", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6d76fa", // Border color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "grey", // Default label color
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6d76fa", // Label color when focused
  },
};
