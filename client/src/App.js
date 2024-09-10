import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Signup from "./pages/auth/SignUpPage";
import Calendar from "./pages/calendar/CalendarPage";
import Bar from "./pages/bar/BarChartPage";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/SettingsPage";
import FoodPage from "./pages/food/FoodPage";
import WeightPage from "./pages/weight/WeightPage";
import WorkoutPage from "./pages/workout/WorkoutPage";
import HomePage from "./pages/home/HomePage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<HomePage />} />

          {/* Routes under MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="food" element={<FoodPage />} />
            <Route path="weight" element={<WeightPage />} />
            <Route path="workout" element={<WorkoutPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="bar" element={<Bar />} />
            <Route path="settings" element={<Settings />} />
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
