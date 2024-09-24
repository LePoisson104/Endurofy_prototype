import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformErrorResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._user_id;
          return user;
        });
        return userAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { userGetUsersQuery } = userApiSlice;

export const selectUserResult = userApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUserResult,
  (userResult) => userResult.data
);
