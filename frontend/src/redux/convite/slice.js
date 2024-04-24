import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  idConvite: "",
  idUser: "",
  idTime: "",
};

const addConviteAsync = createAsyncThunk("time/addTimeAsync", async (data) => {
  const response = await axios.post("http://localhost:3004/time", data);
  return response.data;
});
const getConviteByUserId = createAsyncThunk('time/getTimeAsync', async (userId) => {
    const response = await axios.get(`http://localhost:3004/time?userId=${userId}`);
    return response.data;
});

const updateConvite = createAsyncThunk("time/updateTimeAsync", async (data) => {
  await axios.put(`http://localhost:3004/time/${data.id}`, data);
});

const deleteConviteByUserId = createAsyncThunk('time/deleteTimeAsync', async (userIdDono) => {
    await axios.delete(`http://localhost:3004/time?userId=${userId}`);
});

const deleteConvite = createAsyncThunk("time/deleteTimeAsync", async (id) => {
  await axios.delete(`http://localhost:3004/time/${id}`);
});

const timeSlice = createSlice({
  name: "convites",
  initialState,
  reducers: {
    addConvite: (state, action) => {
        state.idConvite = action.payload.idConvite;
        state.idUser = action.payload.idUser;
        state.idTime = action.payload.nomeTime;
    },
    aceitaConvite(state, action){
        const index = state.findIndex(invite => invite.id === action.payload);
        if (index !== -1) {
            state.splice(index, 1);
          }
    }
  },
});

export const { addConvite, aceitaConvite } = timeSlice.actions;

export { addConviteAsync, getConviteByUserId, updateConvite, deleteConviteByUserId, deleteConvite };

export default conviteSlice.reducer;
