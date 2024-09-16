import { combineReducers } from "redux";
import userReducer from "./user/slice";
import jogadoresReducer from "./jogadores/slice";
import torneioReducer from "./torneios/slice";
import timeReducer from "./time/slice";
import conviteReducer from "./convite/slice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  user: userReducer,
  jogadores: jogadoresReducer,
  torneio: torneioReducer,
  time: timeReducer,
  convite: conviteReducer,
  auth: authSlice,
});

export default rootReducer;
