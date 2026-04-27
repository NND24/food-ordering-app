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
          dispatch(setUserOrder(result.data.success === true ? result.data.data : null));
        } catch {
          dispatch(setUserOrder(null));
        }
      },
    }),
    getOrderDetail: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}/cancel-order`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Order", id: "USER_ORDER" }],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/order/${orderId}/update-status`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Order", id: "USER_ORDER" }],
    }),
  }),
});

export const {
  useGetUserOrderQuery,
  useGetOrderDetailQuery,
  useCancelOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
