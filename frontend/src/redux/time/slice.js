import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CreateAxiosInstance from "../../utils/api";

const api = CreateAxiosInstance();
const initialState = {
  timeUser: {},
  times: [],
};

const addTimeAsync = createAsyncThunk("time/addTimeAsync", async (data) => {
  try {
    const response = await api.post("/time", data);
    alert("time criado");
    return response.data;
  } catch (error) {
    console.error("Erro ao criar o time:", error);
    throw error; // Opcional: lançar o erro para tratamento no componente
  }
});
const getTimeByUserId = createAsyncThunk(
  "time/getTimeByUserIdAsync",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    console.log("token: ", data.token);
    const response = await api.get(`/time/user/${data.userId}`, config);
    console.log("resposta:", response);
    return response.data;
  }
);

const getTimeByUserIdDono = createAsyncThunk(
  "time/getTimeByUserIdDonoAsync",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.get(`/time/dono/${data.userIdDono}`, config);

    return response.data;
  }
);

const getTimeByTimeId = createAsyncThunk(
  "time/getTimeByTimeId",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.get(`/time/${data._id}`, config);

    return response.data;
  }
);

const updateTime = createAsyncThunk("time/updateTimeAsync", async (data) => {
  await axios.put(`http://localhost:3004/time/${data.id}`, data);
});

const deleteTimeByUserId = createAsyncThunk(
  "time/deleteTimeAsync",
  async (userIdDono) => {
    await axios.delete(`http://localhost:3004/time?userId=${userId}`);
  }
);

const deleteTime = createAsyncThunk("time/deleteTimeAsync", async (id) => {
  await axios.delete(`http://localhost:3004/time/${id}`);
});

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    addTime: (state, action) => {
      state.timeUser = action.payload;
    },
    clearTime: (state, action) => {
      state.timeUser = "";
    },
  },
});

export const { addTime, clearTime } = timeSlice.actions;

export {
  addTimeAsync,
  getTimeByUserId,
  getTimeByUserIdDono,
  getTimeByTimeId,
  updateTime,
  deleteTimeByUserId,
  deleteTime,
};

export default timeSlice.reducer;
