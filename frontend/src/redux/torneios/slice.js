import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: "",
  nomeTorneio: "",
  userIdDonoTorneio:"",
  tipoTorneio: "", 
  qtdTimes:"",
  Participantes:[], 
};

const addTorneioAsync = createAsyncThunk("torneio/addTorneioAsync", async (data) => {
  const response = await axios.post("http://localhost:3004/Torneio", data);
  return response.data;
});
const getTorneioByUserIdDonoTorneio = createAsyncThunk('Torneio/getTorneioAsync', async (userIdDonoTorneio) => {
    const response = await axios.get(`http://localhost:3004/Torneio?userId=${userId}`);
    return response.data;
});

const updateTorneio = createAsyncThunk("Torneio/updateTorneioAsync", async (data) => {
  await axios.put(`http://localhost:3004/Torneio/${data.id}`, data);
});

const deleteTorneioByUserIdDonoTorneio = createAsyncThunk('Torneio/deleteTorneioAsync', async (userId) => {
    await axios.delete(`http://localhost:3004/Torneio?userId=${userId}`);
});

const deleteTorneio = createAsyncThunk("Torneio/deleteTorneioAsync", async (id) => {
  await axios.delete(`http://localhost:3004/Torneio/${id}`);
});

const torneioSlice = createSlice({
  name: "Torneio",
  initialState,
  reducers: {
    addTorneio: (state, action) => {
        state.idTorneio = action.payload.id;
        state.nomeTorneio = action.payload.nomeTorneio;
        state.userIdDonoTorneio= action.payload.userIdDonoTorneio;
        state.tipoTorneio = action.payload.tipoTorneio;
        state.qtdTimes = action.payload.qtdTimes;
        state.Participantes = action.payload.Participantes;
    },
    clearTorneio: (state, action) => {
        state.idTorneio = "";
        state.nomeTorneio = "";
        state.userIdDonoTorneio= "";
        state.tipoTorneio = "";
        state.qtdTimes = "";
        state.Participantes = "";
    },
  },
});

export const { addTorneio, clearTorneio } = torneioSlice.actions;

export { addTorneioAsync, getTorneioByUserIdDonoTorneio, updateTorneio, deleteTorneioByUserIdDonoTorneio, deleteTorneio };

export default torneioSlice.reducer;