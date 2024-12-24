import { Box } from "@mui/material";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import useAuth from "../hooks/useAuth";
import { useGetLogDatesQuery } from "../features/food/foodApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setCurrentDate,
} from "../features/date/dateRangeSlice";
import {
  getFirstDayOfPreviousMonth,
  getLastDayOfNextMonth,
  dateConvert,
} from "../helper/getMonthRange";

const FoodCalendar = () => {
  const { userId } = useAuth();
  const [date, setDate] = useState(new Date());
  const [logDatesArr, setLogDatesArr] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dispatch = useDispatch();

  const { startDate, endDate } = useSelector((state) => state.dateRange);

  useEffect(() => {
    const newStartDate = dateConvert(getFirstDayOfPreviousMonth(currentMonth));
    const newEndDate = dateConvert(getLastDayOfNextMonth(currentMonth));
    dispatch(setStartDate(newStartDate));
    dispatch(setEndDate(newEndDate));
  }, [currentMonth]);

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
    dispatch(setCurrentDate(formattedDate));
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
