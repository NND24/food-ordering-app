import { apiSlice } from "../api/apiSlice";
import { setAllChats } from "./chatSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ id, body }) => ({
        url: `/chat/${id}`,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    createStoreChat: builder.mutation({
      query: ({ userId, storeId }) => ({
        url: `/chat/${userId}/store/${storeId}`,
        method: "POST",
        credentials: "include",
      }),
    }),
    getAllChats: builder.query({
      query: () => ({
        url: `/chat/`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setAllChats(result.data));
        } catch {
          // query error handled via isError / error from hook
        }
      },
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/chat/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateChatMutation, useCreateStoreChatMutation, useGetAllChatsQuery, useDeleteChatMutation } = chatApi;
