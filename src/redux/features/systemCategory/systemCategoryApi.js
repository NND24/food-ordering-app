import { apiSlice } from "../api/apiSlice";

export const systemCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSystemCategories: builder.query({
      query: () => ({
        url: `/system-category/`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => response.data ?? response,
    }),
  }),
});

export const { useGetAllSystemCategoriesQuery } = systemCategoryApi;
