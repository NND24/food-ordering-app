import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: null,
  userLocations: [],
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
      const payload = action.payload;
      state.userLocations = Array.isArray(payload) ? payload : (payload?.data ?? []);
    },
    resetLocationState: () => initialState,
  },
});

export const { setUserLocations, resetLocationState } = locationSlice.actions;

export default locationSlice.reducer;
