import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upload: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploadImages: (state, action) => {
      state.uploadedImages = action.payload;
    },
    uploadVideo: (state, action) => {
      state.uploadedVideo = action.payload;
    },
    uploadEditImages: (state, action) => {
      state.uploadedEditImages = action.payload;
    },
    uploadEditVideo: (state, action) => {
      state.uploadedEditVideo = action.payload;
    },
    resetUpload: (state) => {
      state.uploadedImages = null;
      state.uploadedVideo = null;
      state.uploadedEditImages = null;
      state.uploadedEditVideo = null;
    },
  },
});

export const { uploadImages, uploadVideo, uploadEditImages, uploadEditVideo, resetUpload } = uploadSlice.actions;

export default uploadSlice.reducer;
