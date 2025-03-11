import { apiSlice } from "../api/apiSlice";
import { resetChatState } from "../chat/chatSlice";
import { resetLocationState } from "../location/locationSlice";
import { resetMessageState } from "../message/messageSlice";
import { resetNotificationState } from "../notification/notificationSlice";
import { resetUploadState } from "../upload/uploadSlice";
import { userApi } from "../user/userApi";
import { resetUserState } from "../user/userSlice";

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
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(resetUserState());
          dispatch(resetUploadState());
          dispatch(resetNotificationState());
          dispatch(resetMessageState());
          dispatch(resetChatState());
          dispatch(resetLocationState());

          localStorage.removeItem("userId");
          localStorage.removeItem("token");
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
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    checkOTP: builder.mutation({
      query: (data) => ({
        url: `/auth/check-otp`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginWithGoogleMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useRefreshAccessTokenQuery,
  useForgotPasswordMutation,
  useCheckOTPMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} = authApi;
