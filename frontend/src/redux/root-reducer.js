import { combineReducers } from "redux";
import userReducer from "./user/slice";
import torneioReducer from "./torneios/slice";
import timeReducer from "./time/slice";

const rootReducer = combineReducers({
  user: userReducer,
  torneio: torneioReducer,
  time: timeReducer,
});

export default rootReducer;
