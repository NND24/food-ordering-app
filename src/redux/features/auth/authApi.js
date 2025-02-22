import { apiSlice } from "../api/apiSlice";
import { userApi } from "../user/userApi";
import { logOut } from "../user/userSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const userId = data._id;
          localStorage.setItem("userId", JSON.stringify(userId));
          localStorage.setItem("token", JSON.stringify(data.token));
          dispatch(userApi.endpoints.getCurrentUser.initiate(userId, { forceRefetch: true }));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    loginWithGoogle: builder.mutation({
      query: (data) => ({
        url: "/auth/login/google",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const userId = data._id;
          localStorage.setItem("userId", JSON.stringify(userId));
          localStorage.setItem("token", JSON.stringify(data.token));
          dispatch(userApi.endpoints.getCurrentUser.initiate(userId, { forceRefetch: true }));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    logoutUser: builder.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),
    refreshAccessToken: builder.query({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
        credentials: "include",
      }),
    }),
    forgotPassToken: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password-token",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    resetPass: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password/${data.token}`,
        method: "PUT",
        body: { password: data.password },
        credentials: "include",
      }),
    }),
    updatePass: builder.mutation({
      query: (data) => ({
        url: `/auth/password`,
        method: "PUT",
        body: { password: data.password },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginWithGoogleMutation,
  useRegisterUserMutation,
  useLogoutUserQuery,
  useRefreshAccessTokenQuery,
  useForgotPassTokenMutation,
  useResetPassMutation,
  useUpdatePassMutation,
} = authApi;
