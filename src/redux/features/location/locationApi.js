import { apiSlice } from "../api/apiSlice";
import { setAllChats, setUserLocations } from "./locationSlice";

export const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLocation: builder.mutation({
      query: (data) => ({
        url: `/location/add-location`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getLocation: builder.query({
      query: (id) => ({
        url: `/location/get-location/${id}`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getUserLocations: builder.query({
      query: () => ({
        url: `/location/get-user-locations`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUserLocations(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    updateLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/location/update-location/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.error(error);
        }
      },
    }),
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/location/delete-location/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useAddLocationMutation,
  useGetLocationQuery,
  useGetUserLocationsQuery,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
