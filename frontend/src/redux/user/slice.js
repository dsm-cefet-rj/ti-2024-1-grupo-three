import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CreateAxiosInstance from "../../utils/api";

const api = CreateAxiosInstance();

const initialState = {
  logged: null,
  user: {},
  tokenExpiration: null,
};

const addUser = createAsyncThunk("user/addUserAsync", async (data) => {
  try {
    const response = await api.post("/user", data);
    alert("Usuário criado com sucesso.");
    return response.data;
  } catch (error) {
    alert("Já existe esse email");
    return false;
  }
});
const searchUserAsync = createAsyncThunk('user/searchUserAsync', async (data) =>{
  try{
    const response = await api.get(`/user?nome_like=${data.nome}`)
    return response.data
  } catch(error){
    alert(error)
  }
})
const updateUser = createAsyncThunk("user/updateUserAsync", async (data) => {
  try {
    let formData = new FormData();
    formData = {
      senha: data.senha,
    };
    if (data.senha.length > 0) formData.senha = data.senha;

    const config = {
      headers: {
        Authorization: `${data.token}`,
      },
    };
    const response = await api.patch(`/user/${data._id}`, formData, config);

    alert("Usuario atualizado com sucesso");
    return response.data.data;
  } catch (error) {
    alert(error);
  }
});

const deleteUser = createAsyncThunk("users/deleteUserAsync", async (infos) => {
  try {
    await api.delete(`/user/${infos.id}`, {
      headers: {
        Authorization: `${infos.token}`,
      },
    });
    alert("Usuario deletado com sucesso.");
  } catch (error) {
    alert("Erro ao deletar usuário");
  }
});

const logoutUserFunc = createAsyncThunk(
  "user/logoutUserAsync",
  async (infos) => {
    try {
      if (infos.token) {
        await api.post("/logout", {
          headers: {
            Authorization: `${infos.token}`,
          },
        });
      }
    } catch (error) {
      alert("Erro no logout");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLoggedUser: (state, action) => {
      state.user = action.payload.user;
      state.logged = action.payload.token;
      state.tokenExpiration = action.payload.expiration;
    },
    logoutUser: (state, action) => {
      state.logged = false;
      state.user = {};
      state.tokenExpiration = null;
    },
  },
});

export const { logoutUser, addLoggedUser } = userSlice.actions;

export { addUser, updateUser, deleteUser, logoutUserFunc, searchUserAsync };

export default userSlice.reducer;
