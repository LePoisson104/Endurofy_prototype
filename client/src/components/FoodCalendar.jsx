import { Box } from "@mui/material";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import useAuth from "../hooks/useAuth";
import { useGetLogDatesQuery } from "../features/food/foodApiSlice";

const dateConvert = (date) => {
  return date.toISOString().split("T")[0];
};

const getFirstDayOfPreviousMonth = (currentMonth) => {
  return new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
};

const getLastDayOfNextMonth = (currentMonth) => {
  return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);
};

const FoodCalendar = ({ setCurrentDate }) => {
  const { userId } = useAuth();
  const [date, setDate] = useState(new Date());
  const [logDatesArr, setLogDatesArr] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calculate initial startDate and endDate
  const initialFirstDayOfPreviousMonth =
    getFirstDayOfPreviousMonth(currentMonth);
  const initialLastDayOfNextMonth = getLastDayOfNextMonth(currentMonth);

  const [startDate, setStartDate] = useState(
    dateConvert(initialFirstDayOfPreviousMonth)
  );
  const [endDate, setEndDate] = useState(
    dateConvert(initialLastDayOfNextMonth)
  );

  const logDates = useGetLogDatesQuery({
    userId,
    startDate,
    endDate,
  })?.data;

  useEffect(() => {
    if (logDates) {
      const formattedDates = logDates.map((date) => new Date(date.logged_date));
      setLogDatesArr(formattedDates);
    }
  }, [logDates]);

  useEffect(() => {
    setStartDate(dateConvert(getFirstDayOfPreviousMonth(currentMonth)));
    setEndDate(dateConvert(getLastDayOfNextMonth(currentMonth)));
  }, [currentMonth]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      // Check if the date is in the highlighted dates array
      if (
        logDatesArr.some(
          (highlightedDate) =>
            highlightedDate.toDateString() === date.toDateString()
        )
      ) {
        return "highlighted"; // Add your custom class for highlighting
      }
    }
    return null;
  };

  const onChange = (date) => {
    if (date.getMonth() + 1 !== currentMonth.getMonth() + 1) {
      setCurrentMonth(date);
    }

    const formattedDate = dateConvert(date);
    setDate(date);
    setCurrentDate(formattedDate); // Update the parent component's state
  };

  const onActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate);
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
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        onActiveStartDateChange={onActiveStartDateChange}
      />
    </Box>
  );
};

export default FoodCalendar;
