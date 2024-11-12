import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const PasswordField = ({
  id,
  label,
  value,
  setValue,
  touched = false,
  errors = false,
  setTouched = () => {}, // No-op function if not provided
  validateField = () => {},
  fieldName,
  validate = true,
  errMsg = false,
  mb,
  size = "large",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      type={showPassword ? "text" : "password"}
      size={size}
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        setTouched((prevTouched) => ({
          ...prevTouched,
          [fieldName]: true,
        }));
        if (validate) {
          validateField(fieldName, value);
        }
      }}
      error={touched[fieldName] && errors[fieldName] && validate}
      helperText={
        touched[fieldName] && errors[fieldName] && validate
          ? `${label} is required`
          : ""
      }
      sx={{
        width: "400px",
        mb: mb,
        "& .MuiOutlinedInput-root": {
          bgcolor: "white",
          "& fieldset": {
            borderColor:
              (errors[fieldName] && validate) || errMsg ? "red" : "grey",
          },
          "&:hover fieldset": {
            borderColor:
              (errors[fieldName] && validate) || errMsg ? "red" : "#6d76fa",
          },
          "&.Mui-focused fieldset": {
            borderColor:
              (errors[fieldName] && validate) || errMsg ? "red" : "#3c47f9",
          },
        },
        "& .MuiInputLabel-root": {
          color: (errors[fieldName] && validate) || errMsg ? "red" : "grey", // Default label color
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: (errors[fieldName] && validate) || errMsg ? "red" : "#868dfb", // Label color when focused
        },
        "& .MuiFormHelperText-root": {
          backgroundColor: "transparent", // Makes the helper text background transparent
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={`toggle ${label.toLowerCase()} visibility`}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
