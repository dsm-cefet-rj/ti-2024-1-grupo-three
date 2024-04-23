import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: "",
  time: {},
  userId:[],
};

const addTimeAsync = createAsyncThunk("time/addTimeAsync", async (data) => {
  const response = await axios.post("http://localhost:3004/time", data);
  return response.data;
});
const getTime = createAsyncThunk('anamnese/getTimeAsync', async (userId) => {
    const response = await axios.get(`http://localhost:3004/anamnese?userId=${userId}`);
    return response.data;
});

const updateTime = createAsyncThunk("time/updateTimeAsync", async (data) => {
  await axios.put(`http://localhost:3004/time/${data.id}`, data);
});

const deleteTime = createAsyncThunk("time/deleteTimeAsync", async (id) => {
  await axios.delete(`http://localhost:3004/time/${id}`);
});

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    addTime: (state, action) => {
      state.logged = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.logged = false;
      state.user = {};
    },
  },
});

export const { logoutUser, addLoggedUser } = userSlice.actions;

export { addUser, updateUser, deleteUser };

export default userSlice.reducer;
