import { combineReducers } from "redux";
import userReducer from "./user/slice";
import torneioReducer from "./torneios/slice";
import timeReducer from "./time/slice";
import conviteReducer from "./convite/slice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  user: userReducer,
  torneio: torneioReducer,
  time: timeReducer,
  convite: conviteReducer,
  auth: authSlice,
});

export default rootReducer;