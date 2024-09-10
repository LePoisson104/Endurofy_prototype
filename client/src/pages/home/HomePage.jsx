import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import NavBar from "../../components/global/NavBar";
import HomeNavBar from "../../components/global/HomeNavBar";
import Footer from "../../components/global/Footer";

const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {/* Navigation */}
      <HomeNavBar bgcolor={`${colors.purpleAccent[400]}`} />

      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "75vh",
          background: `linear-gradient(180deg, ${colors.purpleAccent[400]} 0%, ${colors.grey[1000]} 100%)`,
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <Typography
          variant="h2"
          color="white"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Welcome to FitTracker
        </Typography>
        <Typography
          variant="h5"
          color="white"
          sx={{ mb: 4, maxWidth: "600px" }}
        >
          Your all-in-one fitness app to log your food, workouts, and weight,
          designed to help you stay on track with your health and fitness goals.
        </Typography>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#ffffff",
              color: colors.primary[500],
              "&:hover": { backgroundColor: "#f3f3f3" },
              padding: "10px 20px",
              fontSize: "18px",
            }}
          >
            Get Started
          </Button>
        </Link>
      </Box>

      {/* What You Can Do Section */}
      <Box sx={{ mt: 6, mb: 6 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
        >
          What You Can Do
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Feature 1 */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  Log Your Food
                </Typography>
                <Typography color="textSecondary">
                  Keep track of your daily food intake and nutrition easily.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Add more features below... */}
        </Grid>
      </Box>

      {/* Feature Section */}
      <Box
        sx={{
          mt: 6,
          mb: 6,
          backgroundColor: colors.grey[200],
          padding: "40px 20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
        >
          Why FitTracker Stands Out
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  Custom Plans
                </Typography>
                <Typography color="textSecondary">
                  Create tailored workout and nutrition plans to fit your
                  lifestyle.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  Nutrition Tracking
                </Typography>
                <Typography color="textSecondary">
                  Monitor your calorie and macronutrient intake with ease.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Exercise Section */}
      <Box sx={{ mt: 6, mb: 6 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
        >
          Exercise Plans for Every Goal
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  Strength Training
                </Typography>
                <Typography color="textSecondary">
                  Build muscle and increase strength with personalized workouts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  Cardio Workouts
                </Typography>
                <Typography color="textSecondary">
                  Stay fit and improve your endurance with cardio-based
                  exercises.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
