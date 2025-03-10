import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
    resetCartState: () => initialState,
  },
});

export const { setUserCart, resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
