import { apiSlice } from "../api/apiSlice";
import { setCurrentUser, setUserData } from "../user/userSlice";
import { resetUpload, uploadEditImages, uploadEditVideo, uploadImages, uploadVideo } from "./uploadSlice";

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
    uploadVideo: builder.mutation({
      query: (data) => ({
        url: `/upload/video`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(uploadVideo(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    uploadEditImages: builder.mutation({
      query: (data) => ({
        url: `/upload/images`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(uploadEditImages(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    uploadEditVideo: builder.mutation({
      query: (data) => ({
        url: `/upload/video`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(uploadEditVideo(result.data));
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
      async onQueryStarted(isCurrentUser, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUserData(result.data));
          if (isCurrentUser) {
            dispatch(setCurrentUser(result.data));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    uploadCover: builder.mutation({
      query: (data) => ({
        url: `/upload/cover`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUserData(result.data));
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

export const {
  useUploadImagesMutation,
  useUploadVideoMutation,
  useUploadEditImagesMutation,
  useUploadEditVideoMutation,
  useUploadAvatarMutation,
  useUploadCoverMutation,
  useDeleteFileMutation,
} = uploadApi;
