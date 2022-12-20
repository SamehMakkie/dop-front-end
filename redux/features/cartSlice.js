import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setNumOfItems: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNumOfItems } = cart.actions;

export default cart.reducer;
