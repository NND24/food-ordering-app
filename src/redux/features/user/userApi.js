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
  }),
});

export const { useGetCurrentUserQuery } = userApi;
