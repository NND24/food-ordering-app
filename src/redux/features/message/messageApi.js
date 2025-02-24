import { apiSlice } from "../api/apiSlice";
import { uploadApi } from "../upload/uploadApi";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/message/${id}`,
        method: "POST",
        body: data,
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
    getAllMessages: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/message/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          const { data: deletedMessage } = await queryFulfilled;

          if (deletedMessage?.image?.filePath) {
            dispatch(uploadApi.endpoints.deleteFile.initiate({ filePath: deletedMessage?.image?.filePath }));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useSendMessageMutation, useGetAllMessagesQuery, useDeleteMessageMutation } = messageApi;
