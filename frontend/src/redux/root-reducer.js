import { combineReducers } from "redux";
import userReducer from "./user/slice";
import torneioReducer from "./torneios/slice"
const rootReducer = combineReducers({
  user: userReducer,
  torneio: torneioReducer
});

export default rootReducer;
