import { Box, Typography, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Footer from "../../components/global/Footer";
import NavBar from "../../components/global/NavBar";
import MuiSwitch from "../../components/switches/MuiSwitch";

const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <NavBar />

      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 20px",
          gap: 1,
          // background: `linear-gradient(180deg, ${colors.purpleAccent[500]} 0%, ${colors.grey[1000]} 100%)`,
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: { sm: "4rem", xs: "3rem" },
            whiteSpace: "pre-line",
            p: 0,
            fontFamily: "Merriweather, sans-serif",
          }}
        >
          Track Your Fitness, {"\n"} Achieve Your Goals
        </Typography>

        <Typography sx={{ mb: 4, maxWidth: "600px", fontSize: "1rem" }}>
          Your all-in-one fitness app to log your food, workouts, and weight,
          designed to help you stay on track with your health and fitness goals.
        </Typography>

        <Button
          component={Link}
          to="/signup"
          size="large"
          sx={{
            color: "white",
            bgcolor: colors.purpleAccent[400],
            "&:hover": { backgroundColor: colors.purpleAccent[300] },
            padding: "10px 20px",
            fontSize: 18,
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            borderRadius: 2,
            mb: 3,
          }}
        >
          Get Started <a style={{ fontWeight: 300 }}>- it's free</a>
        </Button>
        <MuiSwitch />
        {/* What You Can Do Section */}
        <Box
          sx={{
            mt: 3,
            width: "1000px",
            height: "550px",
            bgcolor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        ></Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
