import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLocations: (state, action) => {
      state.userLocations = action.payload;
    },
    resetLocationState: () => initialState,
  },
});

export const { setUserLocations, resetLocationState } = locationSlice.actions;

export default locationSlice.reducer;
