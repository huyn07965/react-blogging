import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reducer } from "./reducer";

const store = configureStore({
  reducer: reducer,
  middleware: (gDM) => gDM().concat(logger),
});
export default store;
