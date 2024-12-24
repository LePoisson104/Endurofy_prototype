import { createSlice } from "@reduxjs/toolkit";
import {
  getFirstDayOfPreviousMonth,
  getLastDayOfNextMonth,
  dateConvert,
} from "../../helper/getMonthRange";

const initialState = {
  currentDate: new Date().toLocaleDateString("en-CA"),
  startDate: dateConvert(getFirstDayOfPreviousMonth(new Date())),
  endDate: dateConvert(getLastDayOfNextMonth(new Date())),
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
  },
});

export const { setCurrentDate, setStartDate, setEndDate } =
  dateRangeSlice.actions;
export default dateRangeSlice.reducer;
