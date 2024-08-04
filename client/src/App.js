import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./scences/dashboard/Dashboard";
import Login from "./scences/auth/LoginPage";
import NotFoundPage from "./scences/notFoundPage/NotFoundPage";
import Signup from "./scences/auth/SignUpPage";
import Calendar from "./scences/calendar/CalendarPage";
import FAQ from "./scences/faq/FaqPage";
import Bar from "./scences/bar/BarChartPage";
import Line from "./scences/line/LineChartPage";
import Pie from "./scences/pie/PieChartPage";
import Profile from "./scences/profile/Profile";
import Settings from "./scences/settings/SettingsPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="faq" element={<FAQ />} />
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
