import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CreateAxiosInstance from "../../utils/api";

const api = CreateAxiosInstance();

const initialState = {
  partidas: [],
};

const criarPartidas = createAsyncThunk(
  "partidas/criarPartidasAsync",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    try {
      const response = await api.post(`/partidas/${data.torneioId}`, config);
      alert("Partidas criadas!");
      return response.data;
    } catch (error) {
      alert("Erro ao criar partida");
      return false;
    }
  }
);
const addPartida = createAsyncThunk(
  "partidas/addPartidasAsync",
  async (data) => {
    try {
      const response = await api.post("/partidas", data);
      alert("Partidas criadas!");
      return response.data;
    } catch (error) {
      alert("Erro ao criar partida");
      return false;
    }
  }
);

const getPartidas = createAsyncThunk(
  "partidas/getPartidasAsync",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.get(`/partidas/${data.id}`, config);
    return response.data;
  }
);

const getPartidasIdTime = createAsyncThunk(
  "partidas/getPartidasIdTimeAsync",
  async (data) => {
    //get partidas time por id
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.get(`/partidas/time/${data.idTime}`, config);
    return response.data;
  }
);

const updatePartida = createAsyncThunk(
  "user/updatePartidaAsync",
  async (data) => {
    try {
      let formData = new FormData();
      formData = {
        placar: data.placar,
      };

      const config = {
        headers: {
          Authorization: `${data.token}`,
        },
      };
      const response = await api.put(`/partidas/${data.id}`, formData, config);

      alert("Partida atualizada com sucesso");
      return response.data.data;
    } catch (error) {
      alert(error);
    }
  }
);

const partidaSlice = createSlice({
  name: "partidas",
  initialState,
  reducers: {
    addPartidas: (state, action) => {
      state.partidas = action.payload;
    },
    clearPartidas: (state, action) => {
      while (state.length > 0) {
        state.pop();
      }
    },
  },
});

export const { addPartidas, clearPartidas } = partidaSlice.actions;

export {
  addPartida,
  getPartidas,
  getPartidasIdTime,
  updatePartida,
  criarPartidas,
};

export default partidaSlice.reducer;
