import { Button, Box, TextField, Typography, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const SignUp = () => {
  return (
    <Box
      sx={{
        position: "relative", // Allows absolute positioning of the logo
        minHeight: { xl: "135vh", lg: "160vh" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f4f4f4",
      }}
    >
      <NavBar />
      <Box
        component="form"
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
          maxWidth: 450,
          mt: 21,
          mb: { xs: 14, lg: 14 },
        }}
      >
        <Typography
          variant="h4"
          mb={4}
          mt={4}
          fontWeight="bold"
          color="#6d76fa"
        >
          Sign Up
        </Typography>
        <TextField
          id="name"
          label="Full Name"
          variant="outlined"
          type="text"
          required
          sx={{
            mb: 3,
            width: "350px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#6d76fa", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3c47f9", // Border color when focused
              },
            },
          }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          required
          sx={{
            mb: 3,
            width: "350px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#6d76fa", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3c47f9", // Border color when focused
              },
            },
          }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          required
          sx={{
            width: "350px",
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#6d76fa", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3c47f9", // Border color when focused
              },
            },
          }}
        />
        <TextField
          id="confirm-password"
          label="Confirm Password"
          variant="outlined"
          type="password"
          required
          sx={{
            width: "350px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#6d76fa", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3c47f9", // Border color when focused
              },
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            width: "350px",
            mb: 4,
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
            Show Password
          </Typography>
        </Box>
        <Button
          variant="containe"
          type="submit"
          sx={{
            width: "350px",
            background: "#6d76fa",
            color: "white",
            mb: 3,
            "&:hover": {
              backgroundColor: "#868dfb",
            },
          }}
        >
          sign up
        </Button>

        <Typography sx={{ mb: 3 }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#6d76fa",
              display: "inline-block",
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignUp;
