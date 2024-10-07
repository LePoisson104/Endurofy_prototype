import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../../components/global/Header";
import MonthSelect from "../../components/selects/MonthSelect";
import RowRadioButtonsGroup from "../../components/RowRadioButtonGroup";
import FeetSelect from "../../components/selects/FeetSelect";
import InchesSelect from "../../components/selects/InchesSelect";
import { textFieldStyles } from "./TextFieldStyles";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import {
  useGetAllUsersInfoQuery,
  useUpdateUserProfileMutation,
} from "../../features/users/usersApiSlice";
import { dateFormat } from "../../helper/dateFormat";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import ErrorAlert from "../../components/alerts/ErrorAlert";

const Profile = () => {
  const { userId } = useAuth();
  const { data, isLoading } = useGetAllUsersInfoQuery(userId);
  const newDate = new Date(data?.profile_updated_at);
  const { date, time } = dateFormat(newDate);
  const [dataBirthdate] = data.birthdate.split("T");
  const [year, month, day] = dataBirthdate.split("-");
  const weightInKg = Math.ceil(data?.weight / 2.20462);
  const feet = Math.floor(data?.height / 12);
  const inches = data?.height - feet * 12;
  const heightInCM = Math.ceil(data?.height * 2.54);
  const age = new Date().getFullYear() - year;
  const BMI = ((data?.weight * 703) / data?.height ** 2).toFixed(1);

  const [gender, setGender] = useState(data.gender);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentDay, setCurrentDay] = useState(day);
  const [currentYear, setCurrentYear] = useState(year);
  const [currentFeet, setCurerntFeet] = useState(feet);
  const [currentInches, setCurrentInches] = useState(inches);
  const [weight, setWeight] = useState(data?.weight);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedMonth = String(currentMonth).padStart(2, "0");
    const formattedDay = currentDay.padStart(2, "0");
    const birthdate = `${currentYear}-${formattedMonth}-${formattedDay}`;
    const height = currentFeet * 12 + currentInches;

    const payload = {
      gender,
      birthdate,
      height,
      weight,
    };

    try {
      const response = await updateUserProfile({
        userId,
        payload,
      }).unwrap();

      setSuccessMsg(response.message);
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg(err.data?.message);
      } else if (err.status === 401) {
        setErrMsg(err.data?.message);
      } else if (err.status === 404) {
        setErrMsg(err.data?.message);
      } else if (err.status === 409) {
        setErrMsg(err.data?.message);
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="Profile and Targets" />
      {successMsg && (
        <SuccessAlert
          message={successMsg}
          duration={3000}
          setSuccessMsg={setSuccessMsg}
        />
      )}
      {errMsg && (
        <ErrorAlert message={errMsg} duration={3000} setErrMsg={setErrMsg} />
      )}
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Profile
        </Typography>
        <Typography fontWeight="light">
          Last updated on {date} | at {time}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
              mt: 2,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Gender</Typography>
              <Typography fontWeight="light">
                Nutrient targets can vary based on sex. Update your profile
              </Typography>{" "}
              <Typography fontWeight="light">
                when pregnant or breastfeeding to reconfigure your
              </Typography>
              <Typography fontWeight="light">
                default nutrient targets.
              </Typography>
            </Box>
            <RowRadioButtonsGroup gender={gender} setGender={setGender} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Birthday</Typography>
              <Typography fontWeight="light">Age: {age}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MonthSelect month={currentMonth} setMonth={setCurrentMonth} />
              <TextField
                label="Day"
                value={currentDay}
                onChange={(e) => setCurrentDay(e.target.value)}
                sx={{ ...textFieldStyles, width: "90px" }}
              />

              <TextField
                label="year"
                value={currentYear}
                sx={textFieldStyles}
                onChange={(e) => setCurrentYear(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Height</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FeetSelect feet={currentFeet} setFeet={setCurerntFeet} />
              <InchesSelect
                inches={currentInches}
                setInches={setCurrentInches}
              />
              <Typography>or</Typography>
              <TextField
                label="cm"
                disabled
                value={heightInCM}
                sx={{ width: "90px" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Current Weight</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                label="lbs"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                sx={textFieldStyles}
              />
              <Typography>or</Typography>
              <TextField label="kg" value={weightInKg} disabled />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">BMI</Typography>
              <Typography fontWeight="light">
                Your BMI can't be edited as it is a
              </Typography>
              <Typography fontWeight="light">
                function of your weight & height
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography>{BMI}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "#6d76fa",
                color: "white",
                "&:hover ": {
                  backgroundColor: "#9a9ff1",
                },
              }}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
        <Typography variant="h4" fontWeight="bold">
          Energy Target
        </Typography>
        <Box component="form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Custom Energy Target</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField label="kcal" sx={textFieldStyles} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Weight Goal</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField label="lbs" sx={textFieldStyles} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "#6d76fa",
                color: "white",
                "&:hover ": {
                  backgroundColor: "#9a9ff1",
                },
              }}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
      <Typography variant="h4" fontWeight="bold">
        Macro Targets
      </Typography>
      <Typography>Macro Ratios</Typography>
      <Typography fontWeight="light">
        Macro Ratios divides energy into protein, carbs, and fat. As your weight
      </Typography>
      <Typography fontWeight="light">
        changes, so do your targets to keep your ratios steady.
      </Typography>
      <Box component="form">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#68afac",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Protein
              <Typography variant="h5" sx={{ ml: 3 }}>
                25%
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ mr: 2 }}>468 kcal</Typography>
            <TextField label="%" sx={textFieldStyles} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#66b7cd",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Net Carbs
              <Typography variant="h5" sx={{ ml: 3 }}>
                45%
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ mr: 2 }}>842 kcal</Typography>
            <TextField label="%" sx={textFieldStyles} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#FFCC8A",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Fat
              <Typography variant="h5" sx={{ ml: 3 }}>
                30%
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ mr: 2 }}>562 kcal</Typography>
            <TextField label="%" sx={textFieldStyles} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography variant="h5">Energy Target</Typography>
            <Typography fontWeight="light">
              Calculated from your Custom Energy Target.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h5">1872 kcal</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}>
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "#6d76fa",
              color: "white",
              mb: 5,
              "&:hover ": {
                backgroundColor: "#9a9ff1",
              },
            }}
            type="submit"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
