import { apiSlice } from "../api/apiSlice";

export const ratingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreRating: builder.query({
      query: ({ storeId, sort, limit, page }) => ({
        url: `/store/${storeId}/rating`,
        method: "GET",
        params: { sort, limit, page },
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

export const { useGetAllStoreRatingQuery } = ratingApi;
