import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const foodApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFoodByDate: builder.query({
      query: ({ userId, currentDate }) => ({
        url: `/food-diary/get-food-by-date/${userId}?date=${currentDate}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId, currentDate }) =>
        result ? [{ type: "FoodLog", id: `${userId}-${currentDate}` }] : [],
    }),
    searchFood: builder.query({
      query: ({ searchTerm }) => ({
        url: `/food-diary/search-food?query=${searchTerm}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllFoodByDateQuery, useSearchFoodQuery } = foodApiSlice;
