import { apiSlice } from "../api/apiSlice";
import { setCurrentUser, setSearchedUsers, setUserData } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCurrentUser(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/user/`,
        method: "PUT",
        body: body,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCurrentUser(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/user/change-password`,
        method: "PUT",
        body: body,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateUserMutation, useChangePasswordMutation } = userApi;
