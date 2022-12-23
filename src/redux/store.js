import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import langSlice from "./languageSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    data: dataSlice,
    search: searchSlice,
    lang: langSlice,
  },
});

export default store;
