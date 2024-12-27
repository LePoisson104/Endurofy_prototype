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
import { Link } from "react-router-dom";
import TermsOfService from "../../components/TermsOfService";

const ResetPasswordPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLoading = false;
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        sx={{
          position: "absolute",
          top: 40,
          left: 60,
          opacity: { sm: 1, xs: 0 },
        }}
      >
        <Typography
          variant="h4" // Smaller variant for mobile
          sx={{
            cursor: "pointer",
            fontSize: "1.75rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span className="purple-style" style={{ fontWeight: "600" }}>
              Endurofy
            </span>
          </Link>
        </Typography>
      </Box>

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
          mt: "auto",
        }}
      >
        <Typography
          mb={2}
          mt={4}
          fontWeight="bold"
          color="#6d76fa"
          sx={{ fontSize: "1.5rem" }}
        >
          Reset Your Password
        </Typography>

        <Typography
          variant="body1"
          color={"textSecondary"}
          mb={2}
          sx={{ textAlign: "center" }}
        >
          Enter the email associated with your account and we'll send you
          password reset instrucions.
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            mb: 1,
          }}
        >
          <Typography fontWeight={500}>Email</Typography>
        </Box>
        <TextField
          id="email"
          label="Please enter your email address"
          variant="outlined"
          type="email"
          inputRef={emailRef}
          onChange={handleEmailInput}
          required
          sx={{
            bgcolor: "white",
            mb: 3,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errMsg ? "red" : "grey", // Default border color
              },
              "&:hover fieldset": {
                borderColor: errMsg ? "red" : "#868dfb", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: errMsg ? "red" : "#3c47f9", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: errMsg ? "red" : "grey", // Default label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errMsg ? "red" : "#868dfb", // Label color when focused
            },
          }}
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
          {!isLoading && <Typography>Send Reset Instructions</Typography>}
          {isLoading && <CircularProgress size={20} sx={{ color: "white" }} />}
        </Button>
        <Button
          component={Link}
          to="/login"
          sx={{
            textTransform: "none",
            width: "100%",
            color: "#6d76fa",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Or Return to Log In
        </Button>
      </Box>
      <Box
        sx={{
          textAlign: "center", // Center text within the box
          width: { sm: "400px", xs: "350px" },
          p: 2, // Padding for spacing
          mt: "auto",
        }}
      >
        <TermsOfService />
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
