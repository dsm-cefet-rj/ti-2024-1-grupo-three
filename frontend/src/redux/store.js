import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import convitesReducer from "./convite/slice";

import rootReducer from "./root-reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: () => {
    return [logger, thunk];
  },

  reducer: {
    convites: convitesReducer,
    // Outros reducers aqui, se houver
  },
});

export default store;
