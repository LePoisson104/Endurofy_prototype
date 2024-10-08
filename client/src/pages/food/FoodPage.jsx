import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import FoodCalendar from "../../components/FoodCalendar";
import Header from "../../components/global/Header";
import AccordionUsage from "../../components/accordion/AccordionUsage";
import NutrientDoughnutChart from "../../components/charts/NutrientDoughnutChart";
import WaterAccordion from "../../components/accordion/WaterAccordion";
import useAuth from "../../hooks/useAuth";
import { useGetAllUsersInfoQuery } from "../../features/users/usersApiSlice";
import { MACROS } from "../../helper/macrosConstants";

const FoodPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId } = useAuth();
  const { data } = useGetAllUsersInfoQuery(userId);
  const totalCalBurned =
    Math.round(data?.BMR * parseFloat(data?.activity_level)) + data?.BMR;
  const BMRPercent = Math.round((data?.BMR / totalCalBurned) * 100);
  const baselinePercent = Math.round(
    (Math.round(data?.BMR * parseFloat(data?.activity_level)) /
      totalCalBurned) *
      100
  );

  const progressColors = {
    Energy: "#9a9ff1",
    Protein: "#68afac",
    Carbs: "#66b7cd",
    Fat: "#FFCC8A",
  };

  const chartsData = {
    data1: {
      datasets: [
        {
          data: [20, 50, 30], // Example values, adjust as needed
          backgroundColor: ["#FFCC8A", "#68afac", "#66b7cd"], // Fat, Protein, Carbs
          hoverBackgroundColor: ["#FFCC8A", "#68afac", "#66b7cd"],
        },
      ],
      totalCalories: 500,
    },
    data2: {
      datasets: [
        {
          data: [BMRPercent, baselinePercent], // Example values, adjust as needed
          backgroundColor: ["#9a9ff1", "#70d8bd"],
          hoverBackgroundColor: ["#9a9ff1 ", "#70d8bd"],
        },
      ],
      totalCalories: totalCalBurned,
    },
    data3: {
      datasets: [
        {
          data: [100], // Example values, adjust as needed
          backgroundColor: ["#9a9ff1"],
          hoverBackgroundColor: ["#9a9ff1"],
        },
      ],
      totalCalories: data?.calories_target,
    },
  };

  // mock data
  const foodData = {
    breakfast: [
      { name: "Eggs", amount: 200, kcal: 150, protein: 12, carbs: 1, fat: 10 },
      { name: "Toast", amount: 50, kcal: 80, protein: 2, carbs: 15, fat: 1 },
    ],
    lunch: [
      {
        name: "Chicken",
        amount: 250,
        kcal: 300,
        protein: 30,
        carbs: 0,
        fat: 15,
      },
      { name: "Rice", amount: 100, kcal: 130, protein: 3, carbs: 28, fat: 1 },
    ],
    dinner: [
      {
        name: "Salmon",
        amount: 200,
        kcal: 250,
        protein: 25,
        carbs: 0,
        fat: 20,
      },
      { name: "Quinoa", amount: 150, kcal: 120, protein: 5, carbs: 21, fat: 2 },
    ],
  };

  const MacroItems = ({ title, amount, targetAmount }) => {
    const percent = Math.round(
      (parseInt(amount.split("g")) / parseInt(targetAmount.split("g"))) * 100
    );

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={600}>{title}</Typography>
        {/* outerbar */}

        <Box>
          <Box
            sx={{
              width: { xl: "500px", lg: "300px", md: "200px" },
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              {amount} / {targetAmount}
            </Typography>
            <Typography>{percent}%</Typography>
          </Box>
          <Box
            sx={{
              width: "100% ",
              height: "14px",
              backgroundColor: "rgb(216, 216, 216)",
              borderRadius: "7px",
              overflow: "hidden",
            }}
          >
            {/* inner bar */}
            <Box
              sx={{
                width: `${percent}%`,
                backgroundColor: `${progressColors[title]}`, // Directly use title as key
                height: "14px",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box m="20px" sx={{ display: "flex", flexDirection: "column" }}>
      <Header title="Diary" subtitle="Your daily food intake and summary" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column", lg: "row" },
        }}
      >
        {/* Left Box (food input) */}
        <Box
          backgroundColor={colors.primary[400]}
          sx={{
            width: { md: "100%", lg: "80%" },
            padding: "20px",
            marginRight: "20px",
          }}
          id="left"
        >
          <Box>
            <WaterAccordion />
            <AccordionUsage
              title={"Uncategorized"}
              data={foodData.uncatergorized}
            />
            <AccordionUsage title={"Breakfast"} data={foodData.breakfast} />
            <AccordionUsage title={"Lunch"} data={foodData.lunch} />
            <AccordionUsage title={"Dinner"} data={foodData.dinner} />
            <AccordionUsage title={"Snacks"} data={foodData.snacks} />
          </Box>
          <Box
            sx={{ width: "100%", borderTop: "1px solid #888", mb: 3, mt: 3 }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 3,
              height: "25vh",
            }}
          >
            {/* Energy Summary */}
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" fontWeight={600} sx={{ mb: 5 }}>
                Summary Charts
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  height: "15.6vh",
                }}
              >
                <NutrientDoughnutChart
                  title={"Consumed"}
                  data={chartsData.data1}
                />
                <NutrientDoughnutChart
                  title={"Burned"}
                  data={chartsData.data2}
                />
                <NutrientDoughnutChart
                  title={"Remaining"}
                  data={chartsData.data3}
                />
              </Box>
            </Box>
            {/* Vertical line */}
            <Box sx={{ borderLeft: "1px solid #888", ml: 2, mr: 2 }}></Box>
            {/* Macro Targets */}
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Hard code change it later */}
              <Typography variant="h3" fontWeight={600} sx={{ mb: 5 }}>
                Macronutrient Targets
              </Typography>
              <Box>
                <MacroItems
                  title={"Energy"}
                  amount={`${2052}kcal`}
                  targetAmount={`${data?.calories_target}kcal`}
                />
                <MacroItems
                  title={"Protein"}
                  amount={`${190}g`}
                  targetAmount={`${Math.floor(
                    (data.calories_target * data?.protein) /
                      100 /
                      MACROS.protein
                  )}g`}
                />
                <MacroItems
                  title={"Carbs"}
                  amount={`${148}g`}
                  targetAmount={`${Math.floor(
                    (data.calories_target * data?.carbs) / 100 / MACROS.carbs
                  )}g`}
                />
                <MacroItems
                  title={"Fat"}
                  amount={`${63}g`}
                  targetAmount={`${Math.floor(
                    (data.calories_target * data?.fat) / 100 / MACROS.fat
                  )}g`}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ width: "100%", borderTop: "1px solid #888", mb: 3, mt: 3 }}
          ></Box>
          {/* Energy Summary */}
          <Typography variant="h3" fontWeight={600} sx={{ mb: 2 }}>
            Energy Summary
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* Calories Consumed (kcal) */}
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "33.33%" }}
            >
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Calories Consumed (kcal)
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#68afac" }}
                >
                  Protein
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "30%",
                  }}
                >
                  <Typography variant="h6">662 kcal</Typography>
                  <Typography variant="h6">50%</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#66b7cd" }}
                >
                  Carbs
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "30%",
                  }}
                >
                  <Typography variant="h6">344 kcal</Typography>
                  <Typography variant="h6">30%</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#FFCC8A" }}
                >
                  Fat
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "30%",
                  }}
                >
                  <Typography variant="h6">231 kcal</Typography>
                  <Typography variant="h6">20%</Typography>
                </Box>
              </Box>
            </Box>
            {/* Vertical line */}
            <Box sx={{ borderLeft: "1px solid #888", ml: 2, mr: 2 }}></Box>
            {/* Calories Burned (kcal) */}
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "33.33%" }}
            >
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Calories Burned (kcal)
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#9a9ff1" }}
                >
                  Basal Metabolic Rate (BMR)
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "30%",
                  }}
                >
                  <Typography variant="h6">{data?.BMR} kcal</Typography>
                  <Typography variant="h6">{BMRPercent}%</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#70d8bd" }}
                >
                  Baseline Activiy
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "30%",
                  }}
                >
                  <Typography variant="h6">
                    {Math.round(data?.BMR * parseFloat(data?.activity_level))}{" "}
                    kcal
                  </Typography>
                  <Typography variant="h6">{baselinePercent}%</Typography>
                </Box>
              </Box>
            </Box>
            {/* Vertical line */}
            <Box sx={{ borderLeft: "1px solid #888", ml: 2, mr: 2 }}></Box>
            {/* Energy Target*/}
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "33.33%" }}
            >
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Energy Target
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Target</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">
                    {data?.calories_target} kcal
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Consumed</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">-1420 kcal</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#9a9ff1" }}
                >
                  Remaining
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">452 kcal</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Right Box (calendar) */}
        <Box
          backgroundColor={colors.primary[400]}
          sx={{
            width: { xl: "20%", lg: "25%" },
            padding: "20px",
            position: { md: "sticky" },
            top: 0,
            height: {
              xs: "2px", // For small screens
              sm: "250px", // For medium screens
              md: "300px", // For large screens
              lg: "380px", // For extra-large screens
            },
          }}
          id="right"
        >
          <FoodCalendar />
        </Box>
      </Box>
    </Box>
  );
};

export default FoodPage;
