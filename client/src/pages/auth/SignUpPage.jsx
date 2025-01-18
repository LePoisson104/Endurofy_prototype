import { useState, useEffect, useRef } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import RowRadioButtonsGroup from "../../components/RowRadioButtonGroup";
import MonthSelect from "../../components/selects/MonthSelect";
import InchesSelect from "../../components/selects/InchesSelect";
import FeetSelect from "../../components/selects/FeetSelect";
import PasswordField from "../../components/PasswordField";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useSignupMutation } from "../../features/auth/authApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import GoogleBtn from "../../components/buttons/GoogleBtn";
import TermsOfService from "../../components/TermsOfService";
import { errorResponse } from "../../helper/errorResponse";

const SignUp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const passwordPattern = /^[A-Za-z\d@$!%*?&]{10,}$/;

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [matchLength, setMatchLength] = useState(false);

  const topRef = useRef();
  const location = useLocation();
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [signup, { isLoading }] = useSignupMutation();

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

  useEffect(() => {
    if (passwordPattern.test(password) === true) {
      setMatchLength(true);
    } else {
      setMatchLength(false);
    }
  }, [password, passwordPattern]);

  useEffect(() => {
    setErrMsg("");
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    gender,
    month,
    day,
    year,
    feet,
    inches,
    weight,
  ]);

  useEffect(() => {
    // Scroll to top whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if ((successMsg || errMsg) && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [successMsg, errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      return setErrMsg("Confirm password does not match!");
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(year);

    if (parseInt(day) <= 0) {
      return setErrMsg("Day can not be 0 or negative!");
    }

    if (age < 15 || age > 80) {
      return setErrMsg("User must be between 15 and 80 years old!");
    }

    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = day.padStart(2, "0");
    const birthdate = `${year}-${formattedMonth}-${formattedDay}`;
    const height = feet * 12 + inches;

    const payload = {
      firstName,
      lastName,
      email,
      password,
      gender,
      birthdate,
      height,
      weight,
    };

    try {
      const response = await signup(payload).unwrap();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setGender("");
      setMonth("");
      setDay("");
      setYear("");
      setFeet("");
      setInches("");
      setWeight("");
      setSuccessMsg(response.message);
    } catch (err) {
      errorResponse(err, setErrMsg);
    }
  };

  return (
    <Box
      ref={topRef}
      sx={{
        minHeight: { xl: "160vh", md: "180vh", xs: "180vh" },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: colors.grey[1000],
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
      {successMsg && (
        <SuccessAlert
          message={successMsg}
          duration={4000}
          setSuccessMsg={setSuccessMsg}
        />
      )}
      {errMsg && (
        <ErrorAlert message={errMsg} duration={4000} setErrMsg={setErrMsg} />
      )}
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
          maxWidth: "100%",
          width: { sm: "400px", xs: "300px" },
          mt: "auto",
          animation: "fadeIn 1s ease-out", // Add animation here
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography variant="h3" mb={6} fontWeight="bold" color="#6d76fa">
          Sign Up
        </Typography>

        <GoogleBtn mb={3} />
        {/* horizontal line */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <Box sx={{ width: "100%", borderTop: "1px solid #D4D4D4" }}></Box>
          <Typography>or</Typography>
          <Box sx={{ width: "100%", borderTop: "1px solid #D4D4D4" }}></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: 3,
            ml: 2,
            mr: 2,
            gap: 1,
            width: "100%",
          }}
        >
          {/* left box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "50%",
                }}
              >
                <Typography fontWeight={500}>First</Typography>
                <TextField
                  id="first-name"
                  label="Jone"
                  variant="outlined"
                  type="text"
                  size="small"
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
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
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
                    "& .MuiFormHelperText-root": {
                      backgroundColor: "transparent", // Makes the helper text background transparent
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "50%",
                }}
              >
                <Typography fontWeight={500}>Last</Typography>
                <TextField
                  id="last-name"
                  label="Doe"
                  variant="outlined"
                  type="text"
                  size="small"
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
                    touched.lastName && errors.lastName
                      ? "last name is required"
                      : ""
                  }
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
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
                    "& .MuiFormHelperText-root": {
                      backgroundColor: "transparent", // Makes the helper text background transparent
                    },
                  }}
                />
              </Box>
            </Box>
            <Typography fontWeight={500} sx={{ mb: 1 }}>
              Email
            </Typography>
            <TextField
              id="email"
              label="example@gmail.com"
              variant="outlined"
              type="email"
              size="small"
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
              helperText={
                touched.email && errors.email ? "Email is required" : ""
              }
              sx={{
                mb: 3,
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
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
                "& .MuiFormHelperText-root": {
                  backgroundColor: "transparent", // Makes the helper text background transparent
                },
              }}
            />
            <Typography fontWeight={500} sx={{ mb: 1 }}>
              Password
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: "flex",
                mb: 2,
                color: matchLength === true ? "green" : "black",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "0.25rem",
                }}
              >
                {matchLength === true ? "✓" : "•"}
              </span>
              At-least 10 characters long
            </Typography>

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
              size="small"
            />
            <Typography fontWeight={500} sx={{ mb: 1 }}>
              Confirm Password
            </Typography>
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
              size="small"
            />
          </Box>

          {/* right box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                mb: 3,
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={500}>Gender</Typography>
              <RowRadioButtonsGroup gender={gender} setGender={setGender} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                mb: 3,
                gap: 1,
              }}
            >
              <Typography fontWeight={500}>Birthday</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <MonthSelect
                  month={month}
                  setMonth={setMonth}
                  size="small"
                  bgcolor={"white"}
                />
                <TextField
                  label="Day"
                  type="number"
                  size="small"
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
                  helperText={
                    touched.day && errors.day ? "Day is required" : ""
                  }
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
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
                    // Hide the spinner arrows on input[type=number]
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    "& .MuiFormHelperText-root": {
                      backgroundColor: "transparent", // Makes the helper text background transparent
                    },
                  }}
                />
                <TextField
                  label="Year"
                  type="number"
                  size="small"
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
                  helperText={
                    touched.year && errors.year ? "Year is required" : ""
                  }
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
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
                    // Hide the spinner arrows on input[type=number]
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    "& .MuiFormHelperText-root": {
                      backgroundColor: "transparent", // Makes the helper text background transparent
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                mb: 3,
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={500}>Height</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <FeetSelect
                  feet={feet}
                  setFeet={setFeet}
                  size="small"
                  bgcolor={"white"}
                />
                <InchesSelect
                  inches={inches}
                  setInches={setInches}
                  size="small"
                  bgcolor={"white"}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                mb: 3,
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={500}>Weight</Typography>
              <TextField
                label="lbs"
                type="number"
                size="small"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || "")}
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
                    bgcolor: "white",
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
                  // Hide the spinner arrows on input[type=number]
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& .MuiFormHelperText-root": {
                    backgroundColor: "transparent", // Makes the helper text background transparent
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ width: "100%", borderTop: "1px solid #D4D4D4", mb: 3 }}
        ></Box>

        <Button
          disabled={isLoading}
          variant="contained"
          type="submit"
          sx={{
            width: "100%",
            background: "#6d76fa",
            color: "white",
            textTransform: "none",
            mb: 2,
            "&:hover": {
              backgroundColor: "#868dfb",
            },
          }}
        >
          {!isLoading && <Typography>Sign Up</Typography>}
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
          Or Log In Instead
        </Button>
      </Box>
      <TermsOfService />
    </Box>
  );
};

export default SignUp;
