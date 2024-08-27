import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import FoodCalendar from "../../components/FoodCalendar";
import Header from "../../components/global/Header";
import AccordionUsage from "../../components/AccordionUsage";
import NutrientDoughnutChart from "../../components/charts/NutrientDoughnutChart";

const FoodPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const progressColors = {
    Fat: "#FFE2BD",
    Energy: "#bfb1ff",
    Carbs: "#66b7cd",
    Protein: "#68afac",
  };

  // mock data
  const data = {
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

  const MacroItems = ({ title, amount, targetAmount, percent }) => {
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
              width: "400px",
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
          height: "100vh",
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
            <AccordionUsage
              title={"Uncategorized"}
              data={data.uncatergorized}
            />
            <AccordionUsage title={"Breakfast"} data={data.breakfast} />
            <AccordionUsage title={"Lunch"} data={data.lunch} />
            <AccordionUsage title={"Dinner"} data={data.dinner} />
            <AccordionUsage title={"Snacks"} data={data.snacks} />
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
                Energy Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <NutrientDoughnutChart />
                <NutrientDoughnutChart />
                <NutrientDoughnutChart />
              </Box>
            </Box>
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
                  targetAmount={`${1892}kcal`}
                  percent={110}
                />
                <MacroItems
                  title={"Protein"}
                  amount={`${199}g`}
                  targetAmount={`${177}g`}
                  percent={170}
                />
                <MacroItems
                  title={"Carbs"}
                  amount={`${148}g`}
                  targetAmount={`${210}g`}
                  percent={71}
                />
                <MacroItems
                  title={"Fat"}
                  amount={`${63}g`}
                  targetAmount={`${62}g`}
                  percent={102}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Right Box (calendar) */}
        <Box
          backgroundColor={colors.primary[400]}
          sx={{
            width: { xl: "20%", lg: "30%" },
            padding: "20px",
            position: { md: "sticky" },
            top: 0,
            height: {
              xs: "2px", // For small screens
              sm: "250px", // For medium screens
              md: "300px", // For large screens
              lg: "350px", // For extra-large screens
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
