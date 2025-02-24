import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    resetChatState: () => initialState,
  },
});

export const { setAllChats, resetChatState } = chatSlice.actions;

export default chatSlice.reducer;
