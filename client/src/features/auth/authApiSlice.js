import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";
import { setCurrentDate } from "../date/dateRangeSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    signup: builder.mutation({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
            dispatch(setCurrentDate(new Date().toLocaleDateString("en-CA")));
            localStorage.clear("sidebarState");
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
