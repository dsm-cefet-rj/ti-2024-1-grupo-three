import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CreateAxiosInstance from "../../utils/api";

const api = CreateAxiosInstance();
const initialState = {
  timeUser: {}, // Armazena o time do usuário
  times: [], // Armazena os times participantes do torneio
  eDono: false, // Verifica se o usuário é dono do time
};

// Ação para adicionar um novo time
const addTimeAsync = createAsyncThunk("time/addTimeAsync", async (data) => {
  try {
    const response = await api.post("/time", data);
    alert("Time criado");
    return response.data;
  } catch (error) {
    console.error("Erro ao criar o time:", error);
    throw error; // Opcional: lançar o erro para tratamento no componente
  }
});

const searchTimeAsync = createAsyncThunk(
  "time/searchTimeAsync",
  async (data) => {
    try {
      const response = await api.get(`/time?nome_like=${data.nome}`);
      return response.data;
    } catch (error) {
      alert(error);
    }
  }
);

// Buscar time pelo ID do usuário
const getTimeByUserId = createAsyncThunk(
  "time/getTimeByUserIdAsync",
  async (data) => {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.get(`/time/user/${data.userId}`, config);
    return response.data;
  }
);

const deleteUserFromTime = createAsyncThunk(
  "time/deleteUserFromTimeAsync",
  async (data) => {
    //sair do time
    try {
      const config = {
        headers: {
          Authorization: `${data.token}`,
        },
      };
      console.log("voce chegou ate aqui", data);
      const response = await api.delete(`/times/${data.id}`, config);
      console.log("voce chegou ate aqui!");
      alert("Você deletou o jogador do time com sucesso");
      return response.data; // Certifique-se de retornar algo se necessário
    } catch (error) {
      console.error("Erro ao deletar jogador do time:", error); // Logar o erro para depuração
      alert("Ocorreu um erro ao tentar excluir jogador do time");
    }
  }
); //deletar usuario do time

const deleteTime = createAsyncThunk("time/deleteTimeAsync", async (data) => {
  //sair do time
  try {
    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    console.log("voce chegou ate aqui", data);
    const response = await api.delete(`/time/${data.id}`, config);
    console.log("voce chegou ate aqui!");
    alert("Você saiu do time com sucesso");
    return response.data; // Certifique-se de retornar algo se necessário
  } catch (error) {
    console.error("Erro ao Sair do time:", error); // Logar o erro para depuração
    alert("Ocorreu um erro ao tentar sair do time");
  }
});
// Buscar time pelo ID do dono
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

// Buscar time pelo ID do time
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

// Ação para atualizar o time
const updateTime = createAsyncThunk("user/updateTimeAsync", async (data) => {
  try {
    console.log("data recebida:", data);
    let formData = new FormData();
    formData = {
      nometime: data.nomeTime,
    };

    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.put(`/time/${data.id}`, formData, config);

    alert("Time atualizado com sucesso");
    return response.data.data;
  } catch (error) {
    alert(error);
  }
});

// Ação para deletar o time pelo ID do dono do usuário
const deleteTimeByUserId = createAsyncThunk(
  "time/deleteTimeAsync",
  async (userIdDono) => {
    await api.delete(`/time?userId=${userIdDono}`);
  }
);

// Ação para deletar um time específico pelo ID

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    addTime: (state, action) => {
      state.timeUser = action.payload;
    },
    clearTime: (state) => {
      state.timeUser = {};
      state.eDono = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimeByUserId.fulfilled, (state, action) => {
        state.timeUser = action.payload;
        // Verifica se o usuário é o dono do time
        state.eDono = action.payload.userIdDono === action.meta.arg.userId;
      })
      .addCase(getTimeByUserIdDono.fulfilled, (state, action) => {
        state.timeUser = action.payload;
        // Se foi buscado pelo ID do dono, então é o dono
        state.eDono = true;
      })
      .addCase(getTimeByTimeId.fulfilled, (state, action) => {
        state.times = action.payload.participantes;
      });
  },
});

// Exportando ações e reducer
export const { addTime, clearTime } = timeSlice.actions;

export {
  addTimeAsync,
  getTimeByUserId,
  searchTimeAsync,
  getTimeByUserIdDono,
  getTimeByTimeId,
  updateTime,
  deleteTimeByUserId,
  deleteTime,
  deleteUserFromTime,
};

export default timeSlice.reducer;
