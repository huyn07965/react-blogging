import { combineReducers } from "@reduxjs/toolkit";
import translateSlice from "./slice/TranslateLanguage";

export const reducer = combineReducers({
  translate: translateSlice,
});
