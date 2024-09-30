import { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/global/Footer";
import NavBar from "../../components/global/NavBar";
import RowRadioButtonsGroup from "../../components/RowRadioButtonGroup";
import MonthSelect from "../../components/selects/MonthSelect";
import InchesSelect from "../../components/selects/InchesSelect";
import FeetSelect from "../../components/selects/FeetSelect";
import PasswordField from "../../components/PasswordField";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const SignUp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    month: false,
    day: false,
    year: false,
    feet: false,
    inches: false,
    weight: false,
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    day: false,
    year: false,
    weight: false,
  });

  const validateField = (fieldName, value) => {
    if (value.trim() === "") {
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
        position: "relative",
        minHeight: { xl: "135vh", lg: "160vh" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: colors.grey[1000],
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
          maxWidth: 430,
          mt: 14,
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
          id="first-name"
          label="First Name"
          variant="outlined"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={() => {
            setTouched((prevTouched) => ({
              ...prevTouched,
              firstName: true,
            }));
            validateField("firstName", firstName);
          }}
          error={touched.firstName && errors.firstName}
          helperText={
            touched.firstName && errors.firstName
              ? "first name is required"
              : ""
          }
          sx={{
            mb: 3,
            width: "350px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.firstName ? "red" : "grey",
              },
              "&:hover fieldset": {
                borderColor: errors.firstName ? "red" : "#868dfb",
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.firstName ? "red" : "#3c47f9",
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.firstName ? "red" : "grey", // Default label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errors.firstName ? "red" : "#868dfb", // Label color when focused
            },
          }}
        />
        <TextField
          id="last-name"
          label="Last Name"
          variant="outlined"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onBlur={() => {
            setTouched((prevTouched) => ({
              ...prevTouched,
              lastName: true,
            }));
            validateField("lastName", lastName);
          }}
          error={touched.lastName && errors.lastName}
          helperText={
            touched.lastName && errors.lastName ? "last name is required" : ""
          }
          sx={{
            mb: 3,
            width: "350px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.lastName ? "red" : "grey",
              },
              "&:hover fieldset": {
                borderColor: errors.lastName ? "red" : "#868dfb",
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.lastName ? "red" : "#3c47f9",
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.lastName ? "red" : "grey", // Default label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errors.lastName ? "red" : "#868dfb", // Label color when focused
            },
          }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            setTouched((prevTouched) => ({
              ...prevTouched,
              email: true,
            }));
            validateField("email", email);
          }}
          error={touched.email && errors.email}
          helperText={touched.email && errors.email ? "Email is required" : ""}
          sx={{
            mb: 3,
            width: "350px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.email ? "red" : "grey",
              },
              "&:hover fieldset": {
                borderColor: errors.email ? "red" : "#868dfb",
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.email ? "red" : "#3c47f9",
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.email ? "red" : "grey", // Default label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errors.email ? "red" : "#868dfb", // Label color when focused
            },
          }}
        />
        <PasswordField
          id="password"
          label="Password"
          value={password}
          setValue={setPassword}
          touched={touched}
          errors={errors}
          setTouched={setTouched}
          validateField={validateField}
          fieldName="password"
          validate={true}
          mb={3}
        />

        <PasswordField
          id="confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          touched={touched}
          errors={errors}
          setTouched={setTouched}
          validateField={validateField}
          fieldName="confirmPassword"
          validate={true}
          mb={3}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "350px",
            mb: 3,
            justifyContent: "space-between",
          }}
        >
          <Typography>Gender</Typography>
          <RowRadioButtonsGroup />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "350px",
            mb: 3,
            gap: 1,
          }}
        >
          <MonthSelect />
          <TextField
            label="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            onBlur={() => {
              setTouched((prevTouched) => ({
                ...prevTouched,
                day: true,
              }));
              validateField("day", day);
            }}
            error={touched.day && errors.day}
            helperText={touched.day && errors.day ? "Day is required" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.day ? "red" : "grey",
                },
                "&:hover fieldset": {
                  borderColor: errors.day ? "red" : "#868dfb",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.day ? "red" : "#3c47f9",
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.day ? "red" : "grey", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: errors.day ? "red" : "#868dfb", // Label color when focused
              },
            }}
          />
          <TextField
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onBlur={() => {
              setTouched((prevTouched) => ({
                ...prevTouched,
                year: true,
              }));
              validateField("year", year);
            }}
            error={touched.year && errors.year}
            helperText={touched.year && errors.year ? "Year is required" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.year ? "red" : "grey",
                },
                "&:hover fieldset": {
                  borderColor: errors.year ? "red" : "#868dfb",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.year ? "red" : "#3c47f9",
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.year ? "red" : "grey", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: errors.year ? "red" : "#868dfb", // Label color when focused
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "350px",
            mb: 3,
            justifyContent: "space-between",
          }}
        >
          <Typography>Height</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <FeetSelect />
            <InchesSelect />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "350px",
            mb: 3,
            justifyContent: "space-between",
          }}
        >
          <Typography>Weight</Typography>
          <TextField
            label="lbs"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onBlur={() => {
              setTouched((prevTouched) => ({
                ...prevTouched,
                weight: true,
              }));
              validateField("weight", weight);
            }}
            error={touched.weight && errors.weight}
            helperText={
              touched.weight && errors.weight ? "Weight is required" : ""
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.weight ? "red" : "grey",
                },
                "&:hover fieldset": {
                  borderColor: errors.weight ? "red" : "#868dfb",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.weight ? "red" : "#3c47f9",
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.weight ? "red" : "grey", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: errors.weight ? "red" : "#868dfb", // Label color when focused
              },
            }}
          />
        </Box>
        <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>

        <Button
          variant="contained"
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
          Sign Up
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
            Log In
          </Link>
        </Typography>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignUp;
