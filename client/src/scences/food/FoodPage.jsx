import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import FoodCalendar from "../../components/FoodCalendar";
import Header from "../../components/global/Header";
import AccordionUsage from "../../components/AccordionUsage";
import PieChart from "../../components/charts/PieChart";

const FoodPage = () => {
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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 3,
              backgroundColor: "blue",
            }}
          >
            <PieChart />
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
