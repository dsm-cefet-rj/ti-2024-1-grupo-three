import { combineReducers } from "redux";
import userReducer from "./user/slice";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
