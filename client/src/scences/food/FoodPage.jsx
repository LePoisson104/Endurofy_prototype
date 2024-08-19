import { Box, Typography } from "@mui/material";
import FoodCalendar from "../../components/FoodCalendar";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const FoodPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" sx={{ display: "flex", flexDirection: "column" }}>
      <Header title="Diary" subtitle="Your daily food intake and summary" />
      <Box sx={{ display: "flex", flexDirection: "row", height: "200vh" }}>
        <Box
          backgroundColor={colors.primary[400]}
          sx={{
            width: "80%",
            padding: "20px",
            marginRight: "20px",
          }}
          id="left"
        >
          <Typography variant="h1">Left Section</Typography>
          <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
            scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
            nec congue eget, auctor vitae massa. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum
            interdum, nisi lorem egestas odio, vitae scelerisque enim ligula
            venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor
            vitae massa.
          </Typography>
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          sx={{
            width: { xl: "25%", xs: "30%" },
            padding: "20px",
            position: "sticky",
            top: 0,
            height: "50vh",
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
