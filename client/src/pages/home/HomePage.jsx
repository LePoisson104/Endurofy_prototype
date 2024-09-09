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
import Footer from "../../components/global/Footer";

const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      {/* Hero Section */}
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          background: colors.purpleAccent[400],
          textAlign: "center",
          padding: "20px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h2" color="white" sx={{ mb: 2 }}>
          Welcome to FitTracker
        </Typography>
        <Typography variant="h5" color="white" sx={{ mb: 4 }}>
          Your all-in-one fitness app to log your food, workouts, and weight.
        </Typography>
        <Link to={"/signup"}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#ffffff",
              color: colors.primary[500],
              "&:hover": { backgroundColor: "#e9e9e9" },
            }}
          >
            Get Started
          </Button>
        </Link>
      </Box>

      {/* Features Section */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          What You Can Do
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: colors.primary[400], color: "white" }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Log Your Food
                </Typography>
                <Typography>
                  Keep track of your daily food intake and nutrition.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: colors.primary[400], color: "white" }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Track Your Workouts
                </Typography>
                <Typography>
                  Record your workout routines and progress over time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: colors.primary[400], color: "white" }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Monitor Your Weight
                </Typography>
                <Typography>
                  Stay on top of your weight goals and track your progress.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
