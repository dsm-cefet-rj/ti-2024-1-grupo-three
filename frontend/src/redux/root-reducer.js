import { combineReducers } from "redux";
import userReducer from "./user/slice";
import timeReducer from "./time/slice"

const rootReducer = combineReducers({
  user: userReducer,
  time: timeReducer,
});

export default rootReducer;
