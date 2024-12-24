import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import dateRangeSlice from "../features/date/dateRangeSlice";
import foodSlice from "../features/food/foodSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    devTools: true,
    auth: authReducer,
    dateRange: dateRangeSlice,
    macrosStates: foodSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // concat apiSlice into redux middleware
});

setupListeners(store.dispatch);
