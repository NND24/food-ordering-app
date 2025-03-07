import { apiSlice } from "../api/apiSlice";

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStore: builder.query({
      query: ({ name, category, sort, limit, page }) => ({
        url: `/store/`,
        method: "GET",
        params: { name, category, sort, limit, page },
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
    getStoreInformation: builder.query({
      query: (id) => ({
        url: `/store/${id}`,
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
  }),
});

export const { useGetAllStoreQuery, useGetStoreInformationQuery } = storeApi;
