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
    logOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
  },
});

export const { setCurrentUser, logOut } = userSlice.actions;

export default userSlice.reducer;
