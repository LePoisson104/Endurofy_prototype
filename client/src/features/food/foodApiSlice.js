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
    getCustomFood: builder.query({
      query: ({ userId }) => ({
        url: `/food-diary/get-custom-food/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId }) =>
        result
          ? [{ type: "CustomFood", id: `${userId}` }]
          : [{ type: "CustomFood", id: "LIST" }],
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
    addCustomFood: builder.mutation({
      query: ({ userId, foodPayload }) => ({
        url: `/food-diary/add-custom-food/${userId}`,
        method: "POST",
        body: foodPayload,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "CustomFood", id: `${userId}` },
        { type: "CustomFood", id: "LIST" },
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
    deleteCustomFood: builder.mutation({
      query: ({ customFoodId }) => ({
        url: `/food-diary/delete-custom-food-by-id/${customFoodId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "CustomFood", id: `${userId}` },
        { type: "CustomFood", id: "LIST" },
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
    editCustomFood: builder.mutation({
      query: ({ customFoodId, updatePayload }) => ({
        url: `/food-diary/update-custom-food-by-id/${customFoodId}`,
        method: "PATCH",
        body: updatePayload,
      }),
      invalidatesTags: (result, error, { userId, currentDate }) => [
        { type: "CustomFood", id: `${userId}` },
        { type: "CustomFood", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFoodByDateQuery,
  useGetFavoriteFoodQuery,
  useGetIsFavoriteFoodQuery,
  useGetCustomFoodQuery,
  useGetLogDatesQuery,
  useSearchFoodQuery,
  useAddFoodMutation,
  useAddCustomFoodMutation,
  useAddFavoriteFoodMutation,
  useDeleteFoodMutation,
  useDeleteFavoriteFoodMutation,
  useDeleteCustomFoodMutation,
  useEditFoodMutation,
  useEditCustomFoodMutation,
} = foodApiSlice;
