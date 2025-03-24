import { apiSlice } from "../api/apiSlice";
import { orderApi } from "../order/orderApi";
import { setUserCart } from "./cartSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => ({
        url: `/cart/`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [{ type: "Cart", id: "USER_CART" }],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success === true) {
            dispatch(setUserCart(result.data.data));
          } else {
            dispatch(setUserCart(null));
          }
        } catch (error) {
          dispatch(setUserCart(null));
        }
      },
    }),
    getUserCartInStore: builder.query({
      query: (storeId) => ({
        url: `/cart/${storeId}`,
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
    getDetailCart: builder.query({
      query: (cartId) => ({
        url: `/cart/${cartId}`,
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
    updateCart: builder.mutation({
      query: (data) => ({
        url: `/cart/update`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(cartApi.util.invalidateTags([{ type: "Cart", id: "USER_CART" }]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    clearCartItem: builder.mutation({
      query: (storeId) => ({
        url: `/cart/clear/item/${storeId}`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(storeId, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          // Invalidates the 'getUserCart' query after the cart item is cleared
          dispatch(cartApi.util.invalidateTags([{ type: "Cart", id: "USER_CART" }]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `/cart/clear`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(cartApi.util.invalidateTags([{ type: "Cart", id: "USER_CART" }]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    completeCart: builder.mutation({
      query: (data) => ({
        url: `/cart/complete`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(cartApi.util.invalidateTags([{ type: "Cart", id: "USER_CART" }]));
          dispatch(orderApi.util.invalidateTags([{ type: "Order", id: "USER_ORDER" }]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    reOrder: builder.mutation({
      query: (data) => ({
        url: `/cart/re-order`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(cartApi.util.invalidateTags([{ type: "Cart", id: "USER_CART" }]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useGetUserCartInStoreQuery,
  useGetDetailCartQuery,
  useUpdateCartMutation,
  useClearCartItemMutation,
  useClearCartMutation,
  useCompleteCartMutation,
  useReOrderMutation,
} = cartApi;
