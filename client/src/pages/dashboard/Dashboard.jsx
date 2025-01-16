import { Box, Button, Typography, LinearProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import Header from "../../components/global/Header";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import NutrientDoughnutChart from "../../components/charts/NutrientDoughnutChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CircularProgressBar from "../../components/CircularProgressBar";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useGetAllUsersInfoQuery } from "../../features/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import DotPulse from "../../components/DotPulse";
import { dateFormat } from "../../helper/dateFormat";
import { useSelector } from "react-redux";
import {
  useGetAllFoodByDateQuery,
  useGetLogDatesQuery,
} from "../../features/food/foodApiSlice";
import { countStreaks } from "../../helper/countStreaks";
import { getTodaysDate } from "../../helper/getTodaysDate";
import { foodServingsHelper } from "../../helper/foodServingsHelper";
import { useGetWaterIntakeQuery } from "../../features/water/waterApiSlice";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useAuth();

  const formattedDateTime = `${dateFormat(new Date())?.date} | ${
    dateFormat(new Date())?.time
  } `;
  const currentDate = getTodaysDate();

  // fetch data
  const userData = useGetAllUsersInfoQuery(userId).data;
  const allFoodData = useGetAllFoodByDateQuery({ userId, currentDate })?.data;
  const waterIntake = useGetWaterIntakeQuery({ userId, currentDate })?.data;

  // calculate
  const totalCaloriesBurned =
    Math.round(userData?.BMR * parseFloat(userData?.activity_level)) +
    userData?.BMR;

  const adjustedFoodData = allFoodData?.map((food) =>
    foodServingsHelper({
      serving: food.serving_size,
      unit: food.serving_unit,
      foodData: { ...food },
    })
  );

  // if there are food data then calculate the total calories of all food else 0 kcal is consumed
  const calculateTotal = (data, key, roundToDecimal = false) =>
    data
      ? Math.round(
          data.reduce((total, item) => total + item[key], 0) *
            (roundToDecimal ? 100 : 1)
        ) / (roundToDecimal ? 100 : 1)
      : 0;

  const totalCaloriesConsumed = calculateTotal(adjustedFoodData, "calories");
  const totalProteinConsumed = calculateTotal(
    adjustedFoodData,
    "protein",
    true
  );
  const totalCarbsConsumed = calculateTotal(adjustedFoodData, "carbs", true);
  const totalFatConsumed = calculateTotal(adjustedFoodData, "fat", true);

  let remainingCalories = userData?.calories_target - totalCaloriesConsumed;

  const progress = Math.round(
    (totalCaloriesConsumed / remainingCalories) * 100
  );

  let clampedProgress;

  if (progress < 0) {
    clampedProgress = 100;
  } else {
    clampedProgress = progress;
  }

  const [calRemainTitle, setCalRemainTitle] = useState("Remaining");

  useEffect(() => {
    if (remainingCalories < 0) {
      setCalRemainTitle("Over");
    } else {
      setCalRemainTitle("Remaining");
    }
  }, [remainingCalories]);

  const data = {
    data1: {
      datasets: [
        {
          data: [100], // Example values, adjust as needed
          backgroundColor: [colors.purpleAccent[300]],
          hoverBackgroundColor: [colors.purpleAccent[300]],
        },
      ],
      totalCalories: Math.abs(remainingCalories),
    },
    data2: {
      datasets: [
        {
          data: [
            totalFatConsumed || 100,
            totalProteinConsumed,
            totalCarbsConsumed,
          ], // Example values, adjust as needed
          backgroundColor:
            totalFatConsumed === 0 &&
            totalProteinConsumed === 0 &&
            totalCarbsConsumed === 0
              ? [colors.grey[1200], colors.grey[1200], colors.grey[1200]] // Colors for Fat, Protein, Carbs
              : [
                  colors.yellowAccent[100],
                  colors.greenAccent[1000],
                  colors.blueAccent[1000],
                ], // Gray color when no data
          hoverBackgroundColor:
            totalFatConsumed === 0 &&
            totalProteinConsumed === 0 &&
            totalCarbsConsumed === 0
              ? [colors.grey[1200], colors.grey[1200], colors.grey[1200]] // Colors for Fat, Protein, Carbs
              : [
                  colors.yellowAccent[100],
                  colors.greenAccent[1000],
                  colors.blueAccent[1000],
                ], // Gray color when no data
        },
      ],
      totalCalories: totalCaloriesConsumed,
    },
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle={formattedDateTime} />
      </Box>
      {/* GRID & CHARTS */}
      {/* row 1 */}
      {/* progress circle */}
      {!userData && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <DotPulse />
        </Box>
      )}
      {userData && (
        <>
          {" "}
          <Box
            display="grid"
            gridTemplateColumns="repeat(14, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            <Box
              gridColumn="span 2"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
              }}
            >
              <CircularProgressBar value={clampedProgress} />
            </Box>
            {/* Steps */}
            <Box
              gridColumn="span 3"
              gridRow="span 1"
              bgcolor={colors.primary[400]}
              p={"15px"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 1,
                color: "white",
                // border: `1px solid ${colors.greenAccent[1200]}`,
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: colors.greenAccent[1200],
                  }}
                >
                  <DirectionsRunIcon fontSize="14px" />
                  Steps
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={500}
                  color={colors.primary[100]}
                >
                  2,500
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={500}
                  sx={{ color: colors.greenAccent[1200] }}
                >
                  Steps
                </Typography>
              </Box>
              <Box sx={{ width: "100%", mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{
                    height: 7,
                    borderRadius: 2,
                    backgroundColor: colors.grey[1200], // Lighter shade of #1BCFB4
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: colors.greenAccent[1200], // White progress bar
                    },
                  }}
                />
                <Typography variant="body1" color={colors.primary[100]}>
                  Progress: 50% of your goal
                </Typography>
              </Box>
            </Box>
            {/* water */}
            <Box
              gridColumn="span 3"
              gridRow="span 1"
              bgcolor={colors.primary[400]}
              p={"15px"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 1,
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: colors.blueAccent[1100],
                  }}
                >
                  <WaterDropIcon />
                  Water
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={500}
                  color={colors.primary[100]}
                >
                  {waterIntake?.[0]?.water_amount || 0}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={500}
                  sx={{ color: colors.blueAccent[1100] }}
                >
                  fl oz
                </Typography>
              </Box>
              <Box sx={{ width: "100%", mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(
                    100,
                    Math.round(
                      (waterIntake?.[0]?.water_amount / 128) * 100 || 0
                    )
                  )}
                  sx={{
                    height: 7,
                    borderRadius: 2,
                    backgroundColor: colors.grey[1200], // Lighter shade of #1BCFB4
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: colors.blueAccent[1100], // White progress bar
                    },
                  }}
                />
                <Typography variant="body1" color={colors.primary[100]}>
                  Progress:{" "}
                  {Math.round((waterIntake?.[0]?.water_amount / 128) * 100) ||
                    0}
                  % of your goal
                </Typography>
              </Box>
            </Box>
            {/* calories burned */}
            <Box
              gridColumn="span 3"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
              p={"15px"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 1,
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: colors.redAccent[1000],
                  }}
                >
                  <LocalFireDepartmentIcon />
                  Calories
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={500}
                  color={colors.primary[100]}
                >
                  {totalCaloriesBurned}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={500}
                  sx={{ color: colors.redAccent[1000] }}
                >
                  Kcal
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography color={colors.primary[100]}>
                  Basal Metabolic Rate (BMR): {userData?.BMR} kcal
                </Typography>
                <Typography color={colors.primary[100]}>
                  Baseline Activity:{" "}
                  {Math.round(
                    userData?.BMR * parseFloat(userData?.activity_level)
                  )}{" "}
                  kcal
                </Typography>
              </Box>
            </Box>
            {/* sleep */}
            <Box
              gridColumn="span 3"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
              p={"15px"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 1,
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: colors.purpleAccent[600],
                  }}
                >
                  <BedtimeIcon />
                  Sleep
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={500}
                  color={colors.primary[100]}
                >
                  8
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={500}
                  sx={{ color: colors.purpleAccent[600] }}
                >
                  Hours
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "100%",
                    color: colors.primary[100],
                  }}
                >
                  <BedtimeIcon fontSize="small" />
                  <Typography>12:00 am</Typography>
                  <Box
                    sx={{
                      border: `1px solid ${colors.primary[100]}`,
                      ml: 1,
                      mr: 1,
                      width: "25%",
                    }}
                  ></Box>
                  <LightModeIcon fontSize="small" />
                  <Typography>08:00 am</Typography>
                </Box>
                <Typography variant="body1" color={colors.primary[100]}>
                  Average: 7.5 hours
                </Typography>
              </Box>
            </Box>
            {/* ROW 2 */}
            <Box
              gridColumn="span 3"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 1,
              }}
            >
              <Typography variant="h4" fontWeight="600">
                Calories Remained
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <NutrientDoughnutChart
                  data={data.data1}
                  title={calRemainTitle}
                />
              </Box>
            </Box>
            <Box
              gridColumn="span 3"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 1,
              }}
            >
              <Typography variant="h4" fontWeight="600">
                Calories Consumed
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <NutrientDoughnutChart data={data.data2} title={"Consumed"} />
              </Box>
            </Box>
            <Box
              gridColumn="span 3"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 1,
              }}
            >
              <Typography variant="h4" fontWeight="600">
                Your Day Streaks
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <CalendarMonthIcon fontSize="large" sx={{ color: "#9a9ff1" }} />
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    border: `1px solid ${
                      theme.palette.mode === "dark" ? "white" : "gray"
                    }`,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <Typography variant="h4">20</Typography>
                </Box>
                <p>Start Logging to see your streaks!</p>
              </Box>
            </Box>
            <Box
              gridColumn="span 5"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
              sx={{ borderRadius: 1 }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`3px solid ${colors.primary[200]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h4"
                  fontWeight="600"
                >
                  Recent Workout Log
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  alignItems="center"
                  borderBottom={`1px solid ${colors.primary[200]}`}
                  p="15px"
                >
                  <Box sx={{ width: "33.33%" }}>
                    <Typography variant="h5" fontWeight="500">
                      {transaction.txId}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      color: colors.primary[100],
                      width: "33.33%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {transaction.date}
                  </Box>
                  <Box
                    sx={{
                      width: "33.33%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: colors.purpleAccent[300],
                        p: "5px 10px",
                        borderRadius: "4px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#4CCEAC",
                        },
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
            {/* ROW 3 */}
            <Box
              gridColumn="span 7"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              sx={{ borderRadius: 1 }}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Calories History
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    color={colors.greenAccent[500]}
                    mb={3}
                  >
                    From Sep 1, 2024 to Sep 8, 2024
                  </Typography>
                </Box>
              </Box>
              <Box height="230px" m="-20px 0 0 0">
                <BarChart />
              </Box>
            </Box>
            <Box
              gridColumn="span 7"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              sx={{ borderRadius: 1 }}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Weight Chart
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    color={colors.greenAccent[500]}
                  >
                    Down 2lbs this week
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
