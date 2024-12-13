import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Signup from "./pages/auth/SignUpPage";
import Calendar from "./pages/calendar/CalendarPage";
import Reports from "./pages/reports/ReportCharts";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/SettingsPage";
import FoodPage from "./pages/food/FoodPage";
import WeightPage from "./pages/weight/WeightPage";
import WorkoutPage from "./pages/workout";
import HomePage from "./pages/home/HomePage";
import PersistLogin from "./pages/auth/PersistLogin";
import Terms from "./pages/terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import HomePageLayout from "./layout/HomePageLayout";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<HomePageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>
          {/* Routes under MainLayout */}
          <Route element={<PersistLogin />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="food" element={<FoodPage />} />
              <Route path="weight" element={<WeightPage />} />
              <Route path="workout" element={<WorkoutPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="bar" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Auth and error pages */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
