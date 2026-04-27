import { apiSlice } from "../api/apiSlice";

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStore: builder.query({
      query: ({ keyword, category, sort, limit, page, lat, lon }) => ({
        url: `/customer-store/`,
        method: "GET",
        params: { keyword, category, sort, limit, page, lat, lon },
        credentials: "include",
      }),
    }),
    getStoreInformation: builder.query({
      query: (id) => ({
        url: `/customer-store/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllStoreQuery, useGetStoreInformationQuery } = storeApi;
