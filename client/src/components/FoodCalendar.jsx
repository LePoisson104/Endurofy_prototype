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
import { convertTimeZone } from "../helper/convertTimeZone";

const FoodCalendar = () => {
  const { userId } = useAuth();
  const [date, setDate] = useState(new Date());
  const [logDatesArr, setLogDatesArr] = useState([]);
  const dispatch = useDispatch();

  const { startDate, endDate, currentDate } = useSelector(
    (state) => state.dateRange
  );

  // if currentDate then use the currentDate's month to get the list of log dates
  const [currentMonth, setCurrentMonth] = useState(
    currentDate ? new Date(currentDate) : new Date()
  );

  // Update start and end dates whenever currentMonth changes
  useEffect(() => {
    const newStartDate = dateConvert(getFirstDayOfPreviousMonth(currentMonth));
    const newEndDate = dateConvert(getLastDayOfNextMonth(currentMonth));
    dispatch(setStartDate(newStartDate));
    dispatch(setEndDate(newEndDate));
  }, [currentMonth, dispatch]);

  // Fetch logged dates
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
      const classes = [];
      const dateString = date.toDateString();

      const selectedDateString = currentDate
        ? convertTimeZone(currentDate)
        : null;

      // Add class for selected date
      if (dateString === selectedDateString) {
        classes.push("react-calendar__tile--active");
      }

      // Add class for logged dates
      if (
        logDatesArr.some((logDate) => logDate.toDateString() === dateString)
      ) {
        classes.push("highlighted");
      }

      return classes.length > 0 ? classes.join(" ") : null;
    }
    return null;
  };

  const onChange = (newDate) => {
    if (newDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(newDate);
    }

    const formattedDate = dateConvert(newDate);
    setDate(newDate);
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
        value={
          currentDate
            ? new Date(
                new Date(currentDate).getTime() +
                  new Date().getTimezoneOffset() * 60000
              ).toDateString()
            : date
        }
        tileClassName={tileClassName}
        onActiveStartDateChange={onActiveStartDateChange}
      />
    </Box>
  );
};

export default FoodCalendar;
