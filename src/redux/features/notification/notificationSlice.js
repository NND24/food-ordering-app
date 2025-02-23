import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setAllNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
  },
});

export const { setAllNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
