import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import FoodCalendar from "../../components/FoodCalendar";
import Header from "../../components/global/Header";
import AccordionUsage from "../../components/AccordionUsage";

const FoodPage = () => {
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
          <AccordionUsage />
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
