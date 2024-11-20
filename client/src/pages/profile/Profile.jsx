import {
  Box,
  TextField,
  Typography,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import Header from "../../components/global/Header";
import MonthSelect from "../../components/selects/MonthSelect";
import RowRadioButtonsGroup from "../../components/RowRadioButtonGroup";
import FeetSelect from "../../components/selects/FeetSelect";
import InchesSelect from "../../components/selects/InchesSelect";
import { textFieldStyles } from "./TextFieldStyles";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import {
  useGetAllUsersInfoQuery,
  useUpdateUserProfileMutation,
  useUpdateUserTargetMutation,
} from "../../features/users/usersApiSlice";
import { dateFormat } from "../../helper/dateFormat";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import EnergyTargetHelper from "../../components/modals/EnergyTargetHelper";
import BMIPopover from "../../components/modals/BMIPopover";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { MACROS } from "../../helper/macrosConstants";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import LoadingSpinner from "../../components/alerts/LoadingSpinner";
import UpdateBtn from "../../components/buttons/UpdateBtn";

const Profile = () => {
  const { userId } = useAuth();
  const { data, isLoading } = useGetAllUsersInfoQuery(userId);

  const [updateUserProfile, { isLoading: isUpdatingProfile }] =
    useUpdateUserProfileMutation();
  const [updateUserTarget, { isLoading: isUpdatingTarget }] =
    useUpdateUserTargetMutation();

  const newDate = new Date(data?.profile_updated_at);
  const { date, time } = dateFormat(newDate);

  const weightInKg = Math.round(data?.weight / 2.20462);
  const heightInCM = Math.round(data?.height * 2.54);
  const BMI = ((data?.weight * 703) / data?.height ** 2).toFixed(1);
  let age;

  const [gender, setGender] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [currentFeet, setCurerntFeet] = useState("");
  const [currentInches, setCurrentInches] = useState("");
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [weightGoal, setWeightGoal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [activity, setActivity] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Sync state with fetched data
  useEffect(() => {
    if (data) {
      const dataBirthdate = data?.birthdate?.split("T") || [];
      const [year, month, day] = dataBirthdate[0]?.split("-") || [];
      const feet = Math.floor(data?.height / 12);
      const inches = data?.height - feet * 12;
      age = new Date().getFullYear() - year;

      setGender(data.gender || "");
      setCurrentMonth(month || "");
      setCurrentDay(day || "");
      setCurrentYear(year || "");
      setCurerntFeet(feet || "");
      setCurrentInches(inches || "");
      setWeight(data.weight || "");
      setCalories(data.calories_target || "");
      setWeightGoal(data.weight_goal || "");
      setProtein(data.protein || "");
      setCarbs(data.carbs || "");
      setFat(data.fat || "");
      setActivity(data.activity_level || "");
    }
  }, [data]);

  const handleSubmitProfile = async (e) => {
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

  const handleSubmitTarget = async (e, type) => {
    e.preventDefault();

    let payload = {};

    if (type === "Energy") {
      payload = {
        calories: parseInt(calories),
        weightGoal: parseInt(weightGoal),
      };
    } else if (type === "Macro") {
      payload = {
        protein: parseInt(protein),
        carbs: parseInt(carbs),
        fat: parseInt(fat),
      };
    } else if (type === "Burned") {
      payload = {
        activity_level: activity,
      };
    }

    try {
      const data = await updateUserTarget({ userId, payload }).unwrap();
      setSuccessMsg(data?.message);
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
      {!data && isLoading && (
        <LoadingSkeleton
          height1={550}
          height2={250}
          height3={250}
          height4={300}
        />
      )}
      {(isUpdatingProfile || isUpdatingTarget) && <LoadingSpinner />}
      {data && !isLoading && (
        <>
          {" "}
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Profile
            </Typography>
            <Typography fontWeight="light">
              Last updated on {date} | at {time}
            </Typography>
            <Box component="form" onSubmit={handleSubmitProfile}>
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
                  <MonthSelect
                    month={currentMonth}
                    setMonth={setCurrentMonth}
                  />
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
                  <Typography
                    variant="h5"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    BMI <BMIPopover />
                  </Typography>
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
              <Box
                sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}
              >
                <UpdateBtn isLoading={isUpdatingProfile || isUpdatingProfile} />
              </Box>
            </Box>
            <Box
              sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}
            ></Box>
            {/* Energy Burned */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4" fontWeight="bold">
                    Energy Burned
                  </Typography>
                </Box>
                <Typography fontWeight={"light"}>
                  Select your preferences to determine the amount of energy you
                  burn daily (TDEE).
                </Typography>
              </Box>
            </Box>
            <Box
              component="form"
              onSubmit={(e) => handleSubmitTarget(e, "Burned")}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ width: "50%", marginTop: 1 }}>
                  <Typography variant="h5">
                    Basal Metabolic Rate (BMR)
                  </Typography>
                  <Typography fontWeight={"light"}>
                    BMR is the amount of energy that a person needs to keep the
                    body functioning when at rest.
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
                  <TextField label="kcal" disabled value={data?.BMR} />
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
                  <Typography variant="h5">
                    Baseline Activity Level:{" "}
                    {Math.round(data?.BMR * parseFloat(activity))} kcal
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
                  <FormControl
                    margin="normal"
                    sx={{ ...textFieldStyles, width: "250px" }}
                  >
                    <InputLabel id="activity-label">Activity Level</InputLabel>
                    <Select
                      labelId="activity-label"
                      id="activity"
                      label="Activity Level"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    >
                      <MenuItem value="0">No Activity</MenuItem>
                      <MenuItem value=".2">
                        Sedentary (little or no exercise)
                      </MenuItem>
                      <MenuItem value=".375">
                        Lightly active (1-3 days/week)
                      </MenuItem>
                      <MenuItem value=".55">
                        Moderately active (3-5 days/week)
                      </MenuItem>
                      <MenuItem value=".725">
                        Very active (6-7 days/week)
                      </MenuItem>
                      <MenuItem value=".9">
                        Super active (very hard exercise/physical job)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}
              >
                <UpdateBtn isLoading={isUpdatingProfile || isUpdatingProfile} />
              </Box>
            </Box>
            {/* horizontal line */}
            <Box
              sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}
            ></Box>
            {/* Energy Target */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4" fontWeight="bold">
                    Energy Target
                  </Typography>

                  <IconButton onClick={handleOpen}>
                    <HelpOutlineIcon />
                  </IconButton>
                </Box>
                <Typography fontWeight={"light"}>
                  The calorie estimate provided is a general guideline based on
                  your inputs. Individual results may vary,
                </Typography>
                <Typography fontWeight={"light"}>
                  so it's important to adjust your calorie intake and monitor
                  your progress to find what works best for you.
                </Typography>
                <EnergyTargetHelper open={open} handleClose={handleClose} />
              </Box>
            </Box>
            <Box
              component="form"
              onSubmit={(e) => handleSubmitTarget(e, "Energy")}
            >
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
                  <TextField
                    label="kcal"
                    type="number"
                    sx={textFieldStyles}
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
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
                  <TextField
                    label="lbs"
                    type="number"
                    sx={textFieldStyles}
                    value={weightGoal}
                    onChange={(e) => setWeightGoal(e.target.value)}
                  />
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}
              >
                <UpdateBtn isLoading={isUpdatingProfile || isUpdatingProfile} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
          <Typography variant="h4" fontWeight="bold">
            Macro Targets
          </Typography>
          <Typography>Macro Ratios</Typography>
          <Typography fontWeight="light">
            Macro Ratios divides energy into protein, carbs, and fat. As your
            weight
          </Typography>
          <Typography fontWeight="light">
            changes, so do your targets to keep your ratios steady.
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmitTarget(e, "Macro")}
          >
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
                  <Typography variant="h5" sx={{ ml: 1 }} fontWeight={"light"}>
                    {Math.floor(
                      (data.calories_target * data?.protein) /
                        100 /
                        MACROS.protein
                    )}{" "}
                    g
                  </Typography>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  width: "50%",
                }}
              >
                <Box sx={{ width: "10%" }}>
                  <Typography>
                    {Math.floor((data?.calories_target * data?.protein) / 100)}{" "}
                    kcal
                  </Typography>
                </Box>
                <Box sx={{ width: "90%" }}>
                  <TextField
                    label="%"
                    sx={{ ...textFieldStyles, width: "130px" }}
                    value={protein}
                    type="number"
                    onChange={(e) => setProtein(e.target.value)}
                  />
                </Box>
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
                  <Typography variant="h5" sx={{ ml: 1 }} fontWeight={"light"}>
                    {Math.floor(
                      (data.calories_target * data?.carbs) / 100 / MACROS.carbs
                    )}{" "}
                    g
                  </Typography>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  width: "50%",
                }}
              >
                <Box sx={{ width: "10%" }}>
                  <Typography>
                    {" "}
                    {Math.floor(
                      (data?.calories_target * data?.carbs) / 100
                    )}{" "}
                    kcal
                  </Typography>
                </Box>
                <Box sx={{ width: "90%" }}>
                  <TextField
                    label="%"
                    sx={{ ...textFieldStyles, width: "130px" }}
                    value={carbs}
                    type="number"
                    onChange={(e) => setCarbs(e.target.value)}
                  />
                </Box>
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
                  <Typography variant="h5" sx={{ ml: 1 }} fontWeight={"light"}>
                    {Math.floor(
                      (data.calories_target * data?.fat) / 100 / MACROS.fat
                    )}{" "}
                    g
                  </Typography>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  width: "50%",
                }}
              >
                <Box sx={{ width: "10%" }}>
                  <Typography>
                    {" "}
                    {Math.floor((data?.calories_target * data?.fat) / 100)} kcal
                  </Typography>
                </Box>
                <Box sx={{ width: "90%" }}>
                  <TextField
                    label="%"
                    sx={{ ...textFieldStyles, width: "130px" }}
                    value={fat}
                    type="number"
                    onChange={(e) => setFat(e.target.value)}
                  />
                </Box>
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
                <Typography variant="h5">
                  {data?.calories_target} kcal
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}>
              <UpdateBtn
                mb={5}
                isLoading={isUpdatingProfile || isUpdatingProfile}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
