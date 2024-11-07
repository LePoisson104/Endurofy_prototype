import { Box, Button, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const FoodCalendar = ({ setCurrentDate }) => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode];
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setDate(date);
    setCurrentDate(formattedDate); // Update the parent component's state
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Calendar onChange={onChange} value={date} />
    </Box>
  );
};

export default FoodCalendar;
