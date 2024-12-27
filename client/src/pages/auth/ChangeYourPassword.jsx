import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useRef, useState, useEffect } from "react";
import PasswordField from "../../components/PasswordField";

const ChangeYourPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLoading = false;
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [password, confirmPassword]);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const validateField = (fieldName, value) => {
    if (typeof value === "string" && value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: false,
      }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: colors.grey[1000],
        position: "fixed",
        overflow: "hidden",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "none",
          width: "100%",
          width: { sm: "400px", xs: "300px" },
        }}
      >
        <Typography
          mb={2}
          mt={4}
          fontWeight="bold"
          color="#6d76fa"
          sx={{ fontSize: "1.5rem" }}
        >
          Change Your Password
        </Typography>

        <Typography
          variant="body1"
          color={"textSecondary"}
          mb={2}
          sx={{ textAlign: "center" }}
        >
          Enter a new password below to change your password.
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            mb: 1,
          }}
        >
          <Typography fontWeight={500}>Password</Typography>
        </Box>
        <PasswordField
          id="password"
          label="Enter Your New Password"
          value={password}
          setValue={setPassword}
          touched={touched}
          errors={errors}
          setTouched={setTouched}
          validateField={validateField}
          fieldName="password"
          validate={true}
          mb={3}
          size="large"
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mb: 1,
          }}
        >
          <Typography fontWeight={500}>Confirm Password</Typography>
        </Box>
        <PasswordField
          id="confirm-password"
          label="Enter Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          touched={touched}
          errors={errors}
          setTouched={setTouched}
          validateField={validateField}
          fieldName="confirmPassword"
          validate={true}
          mb={3}
          size="large"
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
            width: "100%",
            background: "#6d76fa",
            color: "white",
            mb: 2,
            mt: 2,
            "&:hover": {
              backgroundColor: "#868dfb",
            },
          }}
        >
          {!isLoading && <Typography>Reset Password</Typography>}
          {isLoading && <CircularProgress size={20} sx={{ color: "white" }} />}
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeYourPassword;
