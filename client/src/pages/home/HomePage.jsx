import { Box, Typography, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Footer from "../../components/global/Footer";
import NavBar from "../../components/global/NavBar";
import MuiSwitch from "../../components/switches/MuiSwitch";
import LogosCarousel from "../../components/LogosCarousel";

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
          overflow: "hidden",
          // background: `linear-gradient(180deg, ${colors.purpleAccent[500]} 0%, ${colors.grey[1000]} 100%)`,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { sm: "4rem", xs: "3rem" },
            whiteSpace: "pre-line",
            p: 0,
            fontFamily: "Host Grotesk, sans-serif",
            color: "#4a4a4a",
          }}
        >
          Strengthen Your Endurance, {"\n"}Enhance Your Life
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            maxWidth: "600px",
            fontFamily: "Host Grotesk, sans-serif",
            color: colors.grey[1100],
          }}
        >
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
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            width: { sm: "100%", xs: "300px" },
            textAlign: "center",
          }}
        >
          <Typography
            color="#696969"
            fontWeight={500}
            variant="h5"
            sx={{
              m: 0,
              p: 0,
              flexShrink: 0,
              display: "inline",
            }}
          >
            Endurofy is compatible with leading{" "}
          </Typography>
          <Typography
            color="#696969"
            fontWeight={500}
            variant="h5"
            sx={{
              m: 0,
              p: 0,
              flexShrink: 0,
              mt: { xs: 1, sm: 0 },
              ml: { sm: 0.5 },
              display: "inline",
            }}
          >
            fitness platforms.
          </Typography>
        </Box>

        <LogosCarousel />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
