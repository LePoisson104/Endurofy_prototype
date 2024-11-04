import { Box, Button, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const FoodCalendar = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode];
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
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
