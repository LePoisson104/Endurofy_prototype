import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersInfo: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) =>
        result ? [{ type: "User", id: userId }] : [],
    }),
    updateUserAccount: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/users/update-account/${userId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.userId }, // Ensure you pass userId correctly
      ],
    }),
    updateUserProfile: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/users/update-profile/${userId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.userId }, // Ensure you pass userId correctly
      ],
    }),
    deleteUserAccount: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/users/delete/${userId}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.userId },
      ],
    }),
  }),
});

export const {
  useGetAllUsersInfoQuery,
  useUpdateUserAccountMutation,
  useUpdateUserProfileMutation,
  useDeleteUserAccountMutation,
} = usersApiSlice;
