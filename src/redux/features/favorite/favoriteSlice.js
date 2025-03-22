import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userFavorite: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setUserFavorite: (state, action) => {
      state.userFavorite = action.payload;
    },
    resetFavoriteState: () => initialState,
  },
});

export const { setUserFavorite, resetFavoriteState } = favoriteSlice.actions;

export default favoriteSlice.reducer;
