import { apiSlice } from "../api/apiSlice";
import { setUserOrder } from "./orderSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrder: builder.query({
      query: () => ({
        url: `/order/`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [{ type: "Order", id: "USER_ORDER" }],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success === true) {
            dispatch(setUserOrder(result.data.data));
          } else {
            dispatch(setUserOrder(null));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getOrderDetail: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
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
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}/cancel-order`,
        method: "PUT",
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

export const { useGetUserOrderQuery, useGetOrderDetailQuery, useCancelOrderMutation } = orderApi;
