import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import logger from "redux-logger";

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
});

export default store;
