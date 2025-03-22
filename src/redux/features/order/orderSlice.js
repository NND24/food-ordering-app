import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrder: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserOrder: (state, action) => {
      state.userOrder = action.payload;
    },
    resetOrderState: () => initialState,
  },
});

export const { setUserOrder, resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
