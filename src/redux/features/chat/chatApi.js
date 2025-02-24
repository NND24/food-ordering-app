import { apiSlice } from "../api/apiSlice";
import { setAllChats } from "./chatSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (id) => ({
        url: `/chat/${id}`,
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
        } catch (error) {
          console.error(error);
        }
      },
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/chat/delete/${id}`,
        method: "DELETE",
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

export const { useCreateChatMutation, useGetAllChatsQuery, useDeleteChatMutation } = chatApi;
