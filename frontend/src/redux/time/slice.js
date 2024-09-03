import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: "",
  nomeTime: "",
  userIdDono:"",
  userId:[],
};

const addTimeAsync = createAsyncThunk("time/addTimeAsync", async (data) => {
  try {
    const response = await axios.post("http://localhost:3004/time", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar o time:", error);
    throw error; // Opcional: lançar o erro para tratamento no componente
  }
});
const getTimeByUserId = createAsyncThunk('time/getTimeAsync', async (userId) => {
    const response = await axios.get(`http://localhost:3004/time?userId=${userId}`);
    return response.data;
});

const updateTime = createAsyncThunk("time/updateTimeAsync", async (data) => {
  await axios.put(`http://localhost:3004/time/${data.id}`, data);
});

const deleteTimeByUserId = createAsyncThunk('time/deleteTimeAsync', async (userIdDono) => {
    await axios.delete(`http://localhost:3004/time?userId=${userId}`);
});

const deleteTime = createAsyncThunk("time/deleteTimeAsync", async (id) => {
  await axios.delete(`http://localhost:3004/time/${id}`);
});

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    addTime: (state, action) => {
        state.id = action.payload.id;
        state.nomeTime = action.payload.nomeTime;
        state.userIdDono= action.payload.userIdDono;
        state.userId = action.payload.userId;
    },
    clearTime: (state, action) => {
        state.id = "";
        state.nomeTime = "";
        state.userIdDono= "";
        state.userId = "";
    },
  },
});

export const { addTime, clearTime } = timeSlice.actions;

export { addTimeAsync, getTimeByUserId, updateTime, deleteTimeByUserId, deleteTime };

export default timeSlice.reducer;
