import { apiSlice } from "../api/apiSlice";

export const ratingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreRating: builder.query({
      query: ({ storeId, sort, limit, page }) => ({
        url: `/rating/${storeId}`,
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
    getDetailRating: builder.query({
      query: (ratingId) => ({
        url: `/rating/detail/${ratingId}`,
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
    addStoreRating: builder.mutation({
      query: ({ data }) => ({
        url: `/rating/add-rating`,
        method: "POST",
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
    editStoreRating: builder.mutation({
      query: ({ ratingId, data }) => ({
        url: `/rating/edit-rating/${ratingId}`,
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
    deleteStoreRating: builder.mutation({
      query: (ratingId) => ({
        url: `/rating/delete-rating/${ratingId}`,
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
  useGetAllStoreRatingQuery,
  useGetDetailRatingQuery,
  useAddStoreRatingMutation,
  useEditStoreRatingMutation,
  useDeleteStoreRatingMutation,
} = ratingApi;
