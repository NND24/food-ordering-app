import { apiSlice } from "../api/apiSlice";

export const foodTypeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFoodTypes: builder.query({
      query: () => ({
        url: `/foodType/`,
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

export const { useGetAllFoodTypesQuery } = foodTypeApi;
