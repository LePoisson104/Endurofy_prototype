import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Signup from "./pages/auth/SignUpPage";
import Calendar from "./pages/calendar/CalendarPage";
import Bar from "./pages/bar/BarChartPage";
import Line from "./pages/line/LineChartPage";
import Pie from "./pages/pie/PieChartPage";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/SettingsPage";
import FoodPage from "./pages/food/FoodPage";
import WeightPage from "./pages/weight/WeightPage";
import WorkoutPage from "./pages/workout/WorkoutPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="food" element={<FoodPage />} />
            <Route path="weight" element={<WeightPage />} />
            <Route path="workout" element={<WorkoutPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="bar" element={<Bar />} />
            <Route path="pie" element={<Pie />} />
            <Route path="line" element={<Line />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
