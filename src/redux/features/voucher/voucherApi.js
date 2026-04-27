import { apiSlice } from "../api/apiSlice";

export const voucherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVouchersByStore: builder.query({
      query: (storeId) => ({
        url: `/voucher/stores/${storeId}/vouchers`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetVouchersByStoreQuery } = voucherApi;
