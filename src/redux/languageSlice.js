import { createSlice } from "@reduxjs/toolkit";

export const langSlice = createSlice({
  name: "Lang",
  initialState: {
    lang: "eg",
  },
  reducers: {
    getLangSlice: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { getLangSlice } = langSlice.actions;
export default langSlice.reducer;
