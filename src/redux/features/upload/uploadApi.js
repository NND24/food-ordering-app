import { apiSlice } from "../api/apiSlice";
import { setCurrentUser } from "../user/userSlice";
import { resetUpload, uploadImages } from "./uploadSlice";

export const uploadApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query: (data) => ({
        url: `/upload/images`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(uploadImages(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    uploadAvatar: builder.mutation({
      query: (data) => ({
        url: `/upload/avatar`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCurrentUser(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    deleteFile: builder.mutation({
      query: (data) => ({
        url: `/upload/delete-file`,
        method: "DELETE",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetUpload());
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useUploadImagesMutation, useUploadAvatarMutation, useDeleteFileMutation } = uploadApi;
