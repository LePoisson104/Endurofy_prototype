import { Box, IconButton } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import Header from "../../components/global/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState } from "react";
import TodayLog from "./TodayLog";
import WorkoutLogs from "./WorkoutLogs";
import { dateFormat } from "../../helper/dateFormat";

const WorkoutLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formattedDateTime = `${dateFormat(new Date())?.date} | ${
    dateFormat(new Date())?.time
  } `;

  const [selectedTab, setSelectedTab] = useState("today");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Box sx={{ p: "20px" }}>
      <Header title={"Workouts"} subtitle={formattedDateTime} />

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
              selectedTab === "filter"
                ? `2px solid ${colors.primary[100]}`
                : "none",
          }}
          onClick={() => handleTabClick("filter")}
        >
          <SortOutlinedIcon fontSize="small" />
          Filter
        </IconButton>
      </Box>
      <Box
        sx={{ width: "100%", borderTop: "1px solid #888", mb: 3, mt: 1 }}
      ></Box>
      {selectedTab === "today" && <TodayLog />}
      {selectedTab !== "today" && <WorkoutLogs selectedTab={selectedTab} />}
    </Box>
  );
};

export default WorkoutLog;
