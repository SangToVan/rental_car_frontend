import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import authModalReducer from "./authModalSlice";
import searchReducer from "./searchSlice";
import searchResultsDisplayTypeReducer from "./searchResultsDisplayTypeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
    searchResultsDisplayType: searchResultsDisplayTypeReducer,
    search: searchReducer,
  },
});
