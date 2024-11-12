import { Box, Button, Typography, LinearProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
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
import { dateFormat } from "../../helper/dateFormat";
import { useGetAllUsersInfoQuery } from "../../features/users/usersApiSlice";
import { useGetAllFoodByDateQuery } from "../../features/food/foodApiSlice";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { foodServingsHelper } from "../../helper/foodServingsHelper";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useAuth();

  const formattedDateTime = `${dateFormat()?.date} | ${dateFormat()?.time} `;

  const currentDate = new Date().toLocaleDateString("en-CA");

  const userData = useGetAllUsersInfoQuery(userId).data;

  const {
    data: foodData,
    error,
    refetch,
    isFetching,
  } = useGetAllFoodByDateQuery({
    userId,
    currentDate,
  });

  // Set allFoodData to empty if error is 404 or while fetching, else use the fetched data
  const allFoodData = error?.status === 404 || isFetching ? [] : foodData || [];

  // Optional: useEffect to log or perform actions on date changes
  useEffect(() => {
    // Trigger refetch whenever `currentDate` changes, if needed
    refetch();
  }, [currentDate, refetch]);

  const adjustedFoodData = allFoodData?.map((food) =>
    foodServingsHelper({
      serving: food.serving_size,
      unit: food.serving_unit,
      foodData: { ...food },
    })
  );

  const totalCalBurned =
    Math.round(userData?.BMR * parseFloat(userData?.activity_level)) +
    userData?.BMR;

  const totalCaloriesConsumed = adjustedFoodData
    ? Math.round(
        adjustedFoodData.reduce((total, food) => total + food.calories, 0)
      )
    : 0;

  let remainingCalories = userData?.calories_target - totalCaloriesConsumed;
  const progress = Math.round(
    (totalCaloriesConsumed / remainingCalories) * 100
  );
  const clampedProgress = Math.min(progress, 100);

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
          backgroundColor: ["#7a7be0"],
          hoverBackgroundColor: ["#7a7be0"],
        },
      ],
      totalCalories: Math.abs(remainingCalories),
    },
    data2: {
      datasets: [
        {
          data: [20, 50, 30], // Example values, adjust as needed
          backgroundColor: ["#FFCC8A", "#68afac", "#66b7cd"], // Fat, Protein, Carbs
          hoverBackgroundColor: ["#FFCC8A", "#68afac", "#66b7cd"],
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
          backgroundColor={"#1BCFB4"}
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
                color: "#D9F6F0",
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
            <Typography variant="h2" fontWeight={"bold"}>
              2,500
            </Typography>
            <Typography variant="h4" fontWeight={500} sx={{ color: "#D9F6F0" }}>
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
                backgroundColor: "#A6E6DD", // Lighter shade of #1BCFB4
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#FFFFFF", // White progress bar
                },
              }}
            />
            <Typography variant="body1">Progress: 50% of your goal</Typography>
          </Box>
        </Box>
        {/* water */}
        <Box
          gridColumn="span 3"
          gridRow="span 1"
          backgroundColor={"#4BCBEB"}
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
                color: "#C4F0F3",
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
            <Typography variant="h2" fontWeight={"bold"}>
              64
            </Typography>
            <Typography variant="h4" fontWeight={500} sx={{ color: "#C4F0F3" }}>
              fl oz
            </Typography>
          </Box>
          <Box sx={{ width: "100%", mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{
                height: 7,
                borderRadius: 2,
                backgroundColor: "#C4F0F3", // Lighter shade of #1BCFB4
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#FFFFFF", // White progress bar
                },
              }}
            />
            <Typography variant="body1">Progress: 50% of your goal</Typography>
          </Box>
        </Box>
        {/* calories burned */}
        <Box
          gridColumn="span 3"
          gridRow="span 1"
          backgroundColor={"#FE9496"}
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
                color: "#FFE1E3",
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
            <Typography variant="h2" fontWeight={"bold"}>
              {totalCalBurned}
            </Typography>
            <Typography variant="h4" fontWeight={500} sx={{ color: "#FFE1E3" }}>
              Kcal
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>
              Basal Metabolic Rate (BMR): {userData?.BMR} kcal
            </Typography>
            <Typography>
              Baseline Activity:{" "}
              {Math.round(userData?.BMR * parseFloat(userData?.activity_level))}{" "}
              kcal
            </Typography>
          </Box>
        </Box>
        {/* sleep */}
        <Box
          gridColumn="span 3"
          gridRow="span 1"
          backgroundColor={"#A05AFF"}
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
                color: "#FFE1E3",
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
            <Typography variant="h2" fontWeight={"bold"}>
              8
            </Typography>
            <Typography variant="h4" fontWeight={500} sx={{ color: "#FFE1E3" }}>
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
              }}
            >
              <BedtimeIcon fontSize="small" />
              <Typography>12:00 am</Typography>
              <Box
                sx={{ border: "1px solid white", ml: 1, mr: 1, width: "25%" }}
              ></Box>
              <LightModeIcon fontSize="small" />
              <Typography>08:00 am</Typography>
            </Box>
            <Typography variant="body1">Average: 7.5 hours</Typography>
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
            <NutrientDoughnutChart data={data.data1} title={calRemainTitle} />
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
                color: theme.palette.mode == "dark" ? "white" : "black",
                fontSize: "2rem",
                fontWeight: "bold",
                border: `1px solid ${
                  theme.palette.mode == "dark" ? "white" : "gray"
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
            <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
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
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
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
                sx={{ width: "33.33%", display: "flex", justifyContent: "end" }}
              >
                <Button
                  sx={{
                    color: theme.palette.mode == "dark" ? "white" : "black",
                    backgroundColor: "#32B593",
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
    </Box>
  );
};

export default Dashboard;
