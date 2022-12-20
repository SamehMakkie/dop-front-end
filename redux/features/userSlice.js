import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: undefined,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = user.actions;

export default user.reducer;
