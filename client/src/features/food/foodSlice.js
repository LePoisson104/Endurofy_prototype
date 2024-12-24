import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCaloriesBurned: 0,
  totalCaloriesConsumed: 0,
  totalProteinConsumed: 0,
  totalCarbsConsumed: 0,
  totalFatConsumed: 0,
  remainingCalories: 0,
  totalWaterIntake: 0,
};

const foodSlice = createSlice({
  name: "macrosStates",
  initialState,
  reducers: {
    setTotalCaloriesBurned(state, action) {
      state.totalCaloriesBurned = action.payload;
    },
    setTotalCaloriesConsumed(state, action) {
      state.totalCaloriesConsumed = action.payload;
    },
    setTotalProteinCosumed(state, action) {
      state.totalProteinConsumed = action.payload;
    },
    setTotalCarbsConsumed(state, action) {
      state.totalCarbsConsumed = action.payload;
    },
    setTotalFatConsumed(state, action) {
      state.totalFatConsumed = action.payload;
    },
    setRemainingCalories(state, action) {
      state.remainingCalories = action.payload;
    },
    setTotalWaterIntake(state, action) {
      state.totalWaterIntake = action.payload;
    },
  },
});

export const {
  setTotalCaloriesBurned,
  setTotalCaloriesConsumed,
  setTotalProteinCosumed,
  setTotalCarbsConsumed,
  setTotalFatConsumed,
  setRemainingCalories,
  setTotalWaterIntake,
} = foodSlice.actions;
export default foodSlice.reducer;
