import { apiSlice } from "../api/apiSlice";
import { setAllNotifications } from "./notificationSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: `/notification/get-all-notifications`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setAllNotifications(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `/notification/update-notification/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setAllNotifications(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } = notificationApi;
