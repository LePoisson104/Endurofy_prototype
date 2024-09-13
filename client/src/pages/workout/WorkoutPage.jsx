import React, { useState } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TodayIcon from "@mui/icons-material/Today";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ScaleIcon from "@mui/icons-material/Scale";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GridOnIcon from "@mui/icons-material/GridOn";
import Header from "../../components/global/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const WorkoutLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedTab, setSelectedTab] = useState("today");
  const [isEdit, setIsEdit] = useState(false);
  const [sessionName, setSessionName] = useState("Today's Session");
  const [sessionNameInput, setSessionNameInput] = useState(sessionName);

  const WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleEdit = () => {
    setIsEdit(true);
  };

  const HandleCancelEdit = () => {
    setIsEdit(false);
  };

  const handleSaveChanges = () => {
    setSessionName(sessionNameInput);
    setIsEdit(false);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Box sx={{ p: "20px" }}>
      <Header title={"Workouts"} subtitle={"August 29, 2024 | 4:32 AM"} />
      {/* filter tab */}
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
                : "none", // Add underline if selected
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
                : "none", // Add underline if selected
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
                : "none", // Add underline if selected
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
                : "none", // Add underline if selected
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
      {/* <Typography variant="h3" fontWeight={"bold"}>
        Training Sessions
      </Typography>
      <Box
        sx={{
          display: "flex",
          mt: 3,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          September 2024
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
          }}
        >
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <Typography>Today</Typography>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 1,
        }}
      >
        {!isEdit && (
          <Typography variant="h3" fontWeight={"bold"}>
            {sessionName}
          </Typography>
        )}
        {isEdit && (
          <TextField
            value={sessionNameInput}
            variant="standard"
            onChange={(e) => setSessionNameInput(e.target.value)}
          />
        )}

        <IconButton onClick={handleEdit}>
          <EditNoteIcon />
        </IconButton>
        {isEdit && (
          <>
            <Button
              sx={{
                color: "#6d76fa",
                textTransform: "none",
                bgcolor: colors.primary[400],
              }}
              onClick={HandleCancelEdit}
            >
              Cancel
            </Button>
            <Button
              sx={{
                color: "white",
                bgcolor: "#6d76fa",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#868dfb",
                },
              }}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </>
        )}
        <IconButton
          size="small"
          sx={{
            color: "white",
            bgcolor: "#6d76fa",
            "&:hover": {
              backgroundColor: "#868dfb",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{ width: "100%", borderTop: "1px solid #888", mb: 1, mt: 1 }}
      ></Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextFormatIcon />
          Exercise Name
        </Typography>
        <Box sx={{ borderLeft: "1px solid #888", ml: 30 }}></Box>
        <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FormatListNumberedIcon fontSize="small" />
          Set
        </Typography>
        <Box sx={{ borderLeft: "1px solid #888", ml: 30 }}></Box>
        <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FormatListNumberedIcon fontSize="small" /> Reps
        </Typography>
        <Box sx={{ borderLeft: "1px solid #888", ml: 30 }}></Box>
        <Typography sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <ScaleIcon fontSize="small" /> Weight
        </Typography>
      </Box>
      <Box
        sx={{ width: "100%", borderTop: "1px solid #888", mb: 1, mt: 1 }}
      ></Box>
    </Box>
  );
};

export default WorkoutLog;
