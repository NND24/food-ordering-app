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
    resetUpload: (state) => {
      state.uploadedImages = null;
    },
    resetUploadState: () => initialState,
  },
});

export const { uploadImages, resetUpload, resetUploadState } = uploadSlice.actions;

export default uploadSlice.reducer;
