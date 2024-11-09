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
        result
          ? [{ type: "FoodLog", id: `${userId}-${currentDate}` }]
          : [{ type: "FoodLog", id: "LIST" }],
    }),
    searchFood: builder.query({
      query: ({ searchTerm }) => ({
        url: `/food-diary/search-food?query=${searchTerm}`,
        method: "GET",
      }),
    }),
    addFood: builder.mutation({
      query: ({ userId, foodPayload }) => ({
        url: `/food-diary/add-food/${userId}`,
        method: "POST",
        body: foodPayload,
      }),
      invalidatesTags: (result, error, { userId, currentDate }) => [
        { type: "FoodLog", id: `${userId}-${currentDate}` },
        { type: "FoodLog", id: "LIST" },
      ],
    }),
    deleteFood: builder.mutation({
      query: ({ foodId }) => ({
        url: `/food-diary/delete-food-by-id/${foodId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId, currentDate }) => [
        { type: "FoodLog", id: `${userId}-${currentDate}` },
        { type: "FoodLog", id: "LIST" },
      ],
    }),
    editFood: builder.mutation({
      query: ({ foodId, updatePayload }) => ({
        url: `/food-diary/update-food-by-id/${foodId}`,
        method: "PATCH",
        body: updatePayload,
      }),
      invalidatesTags: (result, error, { userId, currentDate }) => [
        { type: "FoodLog", id: `${userId}-${currentDate}` },
        { type: "FoodLog", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFoodByDateQuery,
  useSearchFoodQuery,
  useAddFoodMutation,
  useDeleteFoodMutation,
  useEditFoodMutation,
} = foodApiSlice;
