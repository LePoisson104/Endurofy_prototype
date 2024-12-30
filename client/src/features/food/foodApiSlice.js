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
    getFavoriteFood: builder.query({
      query: ({ userId }) => ({
        url: `/food-diary/get-favorite-food/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId }) =>
        result
          ? [{ type: "FavoriteFood", id: `${userId}` }]
          : [{ type: "FavoriteFood", id: "LIST" }],
    }),
    getIsFavoriteFood: builder.query({
      query: ({ userId, foodId }) => ({
        url: `/food-diary/get-is-favorite-food/${userId}?foodId=${foodId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId }) =>
        result
          ? [{ type: "FavoriteFood", id: `${userId}` }]
          : [{ type: "FavoriteFood", id: "LIST" }],
    }),
    getLogDates: builder.query({
      query: ({ userId, startDate, endDate }) => ({
        url: `/food-diary/get-log-dates/${userId}?startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId, startDate, endDate }) => [
        // Use startDate (or another suitable identifier for your invalidation)
        { type: "FoodLog", id: `${userId}-${startDate}-${endDate}` },
        { type: "FoodLog", id: "LIST" },
      ],
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
      invalidatesTags: (
        result,
        error,
        { userId, currentDate, startDate, endDate }
      ) => [
        { type: "FoodLog", id: `${userId}-${currentDate}` },
        { type: "FoodLog", id: "LIST" },
        { type: "FoodLog", id: `${userId}-${startDate}-${endDate}` }, // Invalidate log dates
      ],
    }),
    addFavoriteFood: builder.mutation({
      query: ({ userId, foodPayload }) => ({
        url: `/food-diary/add-favorite-food/${userId}`,
        method: "POST",
        body: foodPayload,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "FavoriteFood", id: `${userId}` },
        { type: "FavoriteFood", id: "LIST" },
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
    deleteFavoriteFood: builder.mutation({
      query: ({ favFoodId }) => ({
        url: `/food-diary/delete-favorite-food-by-id/${favFoodId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "FavoriteFood", id: `${userId}` },
        { type: "FavoriteFood", id: "LIST" },
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
  useGetFavoriteFoodQuery,
  useGetIsFavoriteFoodQuery,
  useSearchFoodQuery,
  useAddFoodMutation,
  useAddFavoriteFoodMutation,
  useDeleteFoodMutation,
  useDeleteFavoriteFoodMutation,
  useEditFoodMutation,
  useGetLogDatesQuery,
} = foodApiSlice;
