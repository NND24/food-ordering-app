import { apiSlice } from "../api/apiSlice";

export const dishApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDish: builder.query({
      query: (storeId) => ({
        url: `/store/${storeId}/dish`,
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
    getDish: builder.query({
      query: (dishId) => ({
        url: `/store/dish/${dishId}`,
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
    getToppingFromDish: builder.query({
      query: (dishId) => ({
        url: `/store/dish/${dishId}/topping`,
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

export const { useGetAllDishQuery, useGetDishQuery, useGetToppingFromDishQuery } = dishApi;
