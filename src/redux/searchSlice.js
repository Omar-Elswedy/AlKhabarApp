import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "MySearch",
  initialState: {
    search: "",
  },
  reducers: {
    getSearchSlice: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { getSearchSlice } = searchSlice.actions;
export default searchSlice.reducer;
