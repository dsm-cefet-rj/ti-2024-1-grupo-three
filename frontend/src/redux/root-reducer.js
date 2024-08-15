import { combineReducers } from "redux";
import userReducer from "./user/slice";
import torneioReducer from "./torneios/slice";
import timeReducer from "./time/slice";
import conviteReducer from "./convite/slice"

const rootReducer = combineReducers({
  user: userReducer,
  torneio: torneioReducer,
  time: timeReducer,
  convite: conviteReducer,
});

export default rootReducer;
