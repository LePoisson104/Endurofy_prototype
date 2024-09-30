import { Button, Box, TextField, Typography, Checkbox } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import PasswordField from "../../components/PasswordField";
import ForgotPasswordModal from "../../components/modals/ForgotPassModal";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg(err.data?.message);
      } else if (err.status === 401) {
        setErrMsg("Incorrect email or password. Try again.");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  return (
    <Box
      sx={{
        position: "relative", // Allows absolute positioning of the logo
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: colors.grey[1000],
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "white",
          width: "100%",
          height: "70px",
          display: "flex",
          justifyContent: {
            xs: "space-between", // Mobile: space-between
            md: "space-evenly", // Desktop: space-evenly
          },
          alignItems: "center",
          padding: {
            xs: "0 20px", // Mobile: 20px padding on sides
            md: "0 50px", // Desktop: 50px padding on sides
          },
          zIndex: 1000, // Ensure the navbar stays above other content
          gap: { xl: 60, lg: 60, sm: 30, xs: 20 },
        }}
      >
        {/* Logo */}
        <Typography
          variant="h4" // Smaller variant for mobile
          fontWeight="400"
          sx={{
            cursor: "pointer",
            fontSize: {
              xs: "20px", // Mobile: Smaller font
              md: "28px", // Desktop: Larger font
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="purple-style">Fit</span>
            <span className="grey-style">Tracker</span>
          </Link>
        </Typography>

        <Link to="/signup">
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "#6d76fa",
              color: "white",
              paddingLeft: "15px",
              paddingRight: "15px",
              height: "35px",
              "&:hover": {
                backgroundColor: "#868dfb",
              },
            }}
          >
            Sign Up
          </Button>
        </Link>
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
          borderRadius: 2,
          padding: 3,
          backgroundColor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0 6px 24px, rgba(0, 0, 0, 0.08) 0 0 0 1px",
          width: "100%",
          maxWidth: 420,
        }}
      >
        <Typography
          variant="h4"
          mb={3}
          mt={4}
          fontWeight="bold"
          color="#6d76fa"
        >
          Log In
        </Typography>
        {errMsg && (
          <Box
            sx={{
              display: "flex",
              color: "red",
              width: "350px",
              height: "50px",
              mb: 3,
              paddingLeft: 1,
              flexDirection: "row",
              alignItems: "center",
              bgcolor: "#ffcdd2",
              gap: 1,
              borderRadius: 1,
            }}
          >
            <WarningAmberIcon />
            <Typography>{errMsg}</Typography>
          </Box>
        )}
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          inputRef={emailRef}
          onChange={handleEmailInput}
          required
          sx={{
            mb: 3,
            width: "350px",
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
        <PasswordField
          id="password"
          label="Password"
          value={password}
          setValue={setPassword}
          fieldName="password"
          validate={false} // Disable validation
          errMsg={errMsg ? true : false}
        />

        <Box
          sx={{
            display: "flex",
            width: "350px",
            mb: 4,
            mt: 1,
          }}
        >
          <Typography>
            <Checkbox
              size="small"
              sx={{
                color: "#6d76fa",
                "&.Mui-checked": {
                  color: "#6d76fa",
                },
              }}
            />
            Remember me
          </Typography>
        </Box>
        <Button
          variant="containe"
          type="submit"
          sx={{
            textTransform: "none",
            width: "350px",
            background: "#6d76fa",
            color: "white",
            mb: 3,
            "&:hover": {
              backgroundColor: "#868dfb",
            },
          }}
        >
          {!isLoading && <Typography>Log In</Typography>}
          {isLoading && <CircularProgress size={20} sx={{ color: "white" }} />}
        </Button>
        <ForgotPasswordModal />
        <Typography sx={{ mb: 3 }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#6d76fa",
              display: "inline-block",
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
