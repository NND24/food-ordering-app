import { apiSlice } from "../api/apiSlice";

export const dishApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDish: builder.query({
      query: (storeId) => ({
        url: `/customer-store/${storeId}/dish`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getDish: builder.query({
      query: (dishId) => ({
        url: `/customer-store/dish/${dishId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getToppingFromDish: builder.query({
      query: (dishId) => ({
        url: `/customer-store/dish/${dishId}/topping`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllDishQuery, useGetDishQuery, useGetToppingFromDishQuery } = dishApi;
