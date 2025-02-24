import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAllMessages: (state, action) => {
      state.allMessages = action.payload;
    },
    resetMessageState: () => initialState,
  },
});

export const { setAllMessages, resetMessageState } = messageSlice.actions;

export default messageSlice.reducer;
