import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CreateAxiosInstance from "../../utils/api";

const api = CreateAxiosInstance();
const initialState = {
  torneioUserDono: {},
  torneioUserParticipa: [],
};

const addTorneioAsync = createAsyncThunk(
  "torneio/addTorneioAsync",
  async (data) => {
    try {
      const response = await api.post("/torneio", data);
      alert("torneio criado");
      return response.data;
    } catch (error) {
      console.error("Erro ao criar o time:", error);
      throw error;
    }
  }
);
const getTorneioByUserIdDonoTorneio = createAsyncThunk(
  "torneio/getTorneioByUserIdDonoTorneioAsync",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.get(`/torneio/dono/${data.userIdDono}`, config);
    return response.data;
  }
);
const getTorneio = createAsyncThunk("torneio/getTorneioAsync", async (data) => {
  const config = {
    headers: {
      Authorization: `${data.token}`,
    },
  };
  const response = await api.get(`/torneio/${data.id}`, config);
  return response.data;
});

const getTorneiosByTime = createAsyncThunk(
  "torneio/getTorneioByTimeAsync",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.get(`/torneio/time/${data.idTime}`, config);
    return response.data;
  }
);

const getTimesByTorneio = createAsyncThunk(
  "torneio/getTimesByTorneioAsync",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.get(`/torneio/meutime/${data.id}`, config);
    return response.data;
  }
);

const updateTorneio = createAsyncThunk(
  "Torneio/updateTorneioAsync",
  async (data) => {
    await axios.put(`http://localhost:3004/Torneio/${data.id}`, data);
  }
);

const deleteTorneioByUserIdDonoTorneio = createAsyncThunk(
  "Torneio/deleteTorneioAsync",
  async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `${data.token}`,
        },
      };
      console.log("voce chegou ate aqui", data);
      await api.delete(`/torneios/dono/${data.userIdDonoTorneio}`, config);
    } catch (error) {
      console.error("Erro ao Excluir o torneio:", error); // Logar o erro para depuração
      alert("Ocorreu um erro ao tentar excluir o torneio");
    }
  }
);

const deleteTimeFromTorneio = createAsyncThunk(
  "Torneio/deleteTimeFromTorneioAsync",
  async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `${data.token}`,
        },
      };
      console.log("voce chegou ate aqui", data);
      await api.delete(`/torneio/time/${data.id}`, config);
    } catch (error) {
      console.error("Erro ao Excluir o time:", error); // Logar o erro para depuração
      alert("Ocorreu um erro ao tentar excluir o time");
    }
  }
);

const deleteTorneio = createAsyncThunk(
  "Torneio/deleteTorneioAsync",
  async (id) => {
    await axios.delete(`http://localhost:3004/Torneio/${id}`);
  }
);

const torneioSlice = createSlice({
  name: "Torneio",
  initialState,
  reducers: {
    addTorneio: (state, action) => {
      state.torneioUserDono = action.payload;
      state.torneioUserParticipa = action.payload;
    },
    clearTorneio: (state, action) => {
      state.torneioUserDono = "";
      state.torneioUserParticipa = "";
    },
  },
});

export const { addTorneio, clearTorneio } = torneioSlice.actions;

export {
  addTorneioAsync,
  getTorneioByUserIdDonoTorneio,
  getTorneiosByTime,
  updateTorneio,
  deleteTorneioByUserIdDonoTorneio,
  deleteTorneio,
  getTimesByTorneio,
  getTorneio,
  deleteTimeFromTorneio,
};

export default torneioSlice.reducer;
