import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "MyData",
  initialState: {
    data: "general",
  },
  reducers: {
    getDataSlice: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getDataSlice } = dataSlice.actions;
export default dataSlice.reducer;
