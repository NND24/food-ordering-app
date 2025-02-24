import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetUserState: () => initialState,
  },
});

export const { setCurrentUser, resetUserState } = userSlice.actions;

export default userSlice.reducer;
