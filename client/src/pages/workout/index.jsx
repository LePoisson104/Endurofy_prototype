import { Box, IconButton } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GridOnIcon from "@mui/icons-material/GridOn";
import Header from "../../components/global/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import TodayLog from "./TodayLog";
import WorkoutLogs from "./WorkoutLogs";

const WorkoutLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedTab, setSelectedTab] = useState("today");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Box sx={{ p: "20px" }}>
      <Header title={"Workouts"} subtitle={"August 29, 2024 | 4:32 AM"} />

      {/* Filter tabs */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <IconButton
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "13px",
            borderRadius: 0,
            height: "35px",
            borderBottom:
              selectedTab === "today"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("today")}
        >
          <TodayIcon fontSize="small" />
          Today
        </IconButton>
        <IconButton
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "13px",
            borderRadius: 0,
            height: "35px",
            borderBottom:
              selectedTab === "week"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("week")}
        >
          <CalendarMonthIcon fontSize="small" />
          Week
        </IconButton>
        <IconButton
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "13px",
            borderRadius: 0,
            height: "35px",
            borderBottom:
              selectedTab === "month"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("month")}
        >
          <CalendarMonthIcon fontSize="small" />
          Month
        </IconButton>
        <IconButton
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "13px",
            borderRadius: 0,
            height: "35px",
            borderBottom:
              selectedTab === "all"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("all")}
        >
          <GridOnIcon fontSize="small" />
          All
        </IconButton>
      </Box>
      <Box
        sx={{ width: "100%", borderTop: "1px solid #888", mb: 3, mt: 1 }}
      ></Box>
      {selectedTab == "today" && <TodayLog />}
      {selectedTab != "today" && <WorkoutLogs selectedTab={selectedTab} />}
    </Box>
  );
};

export default WorkoutLog;
