import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const foodApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWaterIntake: builder.query({
      query: ({ userId, currentDate }) => ({
        url: `/water-diary/get-water-intake-by-date/${userId}?date=${currentDate}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId, currentDate }) => {
        // Always provide the tag for the date, even if the result is null or empty
        return [{ type: "WaterLog", id: `${userId}-${currentDate}` }];
      },
      invalidatesTags: (result, error, { userId, startDate, endDate }) => [
        { type: "FoodLog", id: `${userId}-${startDate}-${endDate}` }, // Invalidate log dates
      ],
    }),
    addWaterIntake: builder.mutation({
      query: ({ userId, waterPayload }) => ({
        url: `/water-diary/add-water/${userId}`,
        method: "POST",
        body: waterPayload,
      }),
      invalidatesTags: (
        result,
        error,
        { userId, currentDate, startDate, endDate }
      ) => [
        { type: "WaterLog", id: `${userId}-${currentDate}` }, // Invalidate tag for the given date
        { type: "FoodLog", id: `${userId}-${startDate}-${endDate}` }, // Invalidate log dates
      ],
    }),
    updateWaterIntake: builder.mutation({
      query: ({ waterId, updatePayload }) => ({
        url: `/water-diary/update-water-intake/${waterId}`,
        method: "PATCH",
        body: updatePayload,
      }),
      invalidatesTags: (
        result,
        error,
        { userId, currentDate, startDate, endDate }
      ) => [
        { type: "WaterLog", id: `${userId}-${currentDate}` }, // Invalidate tag for the given date
        { type: "FoodLog", id: `${userId}-${startDate}-${endDate}` }, // Invalidate log dates
      ],
    }),
  }),
});

export const {
  useGetWaterIntakeQuery,
  useAddWaterIntakeMutation,
  useUpdateWaterIntakeMutation,
} = foodApiSlice;
