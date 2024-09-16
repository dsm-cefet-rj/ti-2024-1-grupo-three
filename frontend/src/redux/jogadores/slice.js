import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CreateAxiosInstance from "../../utils/api";

const api = CreateAxiosInstance();

const initialState = [];

const getJogadores = createAsyncThunk(
  "jogadores/getJogadoresAsync",
  async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `${data.token}`,
        },
      };
      const response = await api.get(`/user/${data.id}`, config);
      return response.data;
    } catch (error) {
      alert(error);
      return false;
    }
  }
);

const getAllJogadores = createAsyncThunk(
  "jogadores/getAllJogadoresAsync",
  async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error) {
      alert(error);
      return false;
    }
  }
);

const jogadoresSlice = createSlice({
  name: "jogadores",
  initialState,
  reducers: {
    addJogadores: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addJogadores } = jogadoresSlice.actions;

export { getAllJogadores, getJogadores };

export default jogadoresSlice.reducer;
