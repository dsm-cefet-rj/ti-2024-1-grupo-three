import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CreateAxiosInstance from "../../utils/api";

const api  = CreateAxiosInstance();

const initialState = {
  logged: null,
  user: {},
  tokenExpiration: null
};

const addUser = createAsyncThunk('user/addUserAsync', async (data) => {
  try{
      const response = await api.post("/user", data);
      alert("Usuário criado com sucesso.");
      return response.data;
  }catch(error){
      
      alert("ja existe esse email");
      return false;
  }
});

const updateUser = createAsyncThunk("user/updateUserAsync", async (data) => {
  try{
      let formData = new FormData();
          formData ={
              nome: data.nome,
              email: data.email,
          }
          if(data.senha.length > 0) formData.senha = data.senha;
  
      const config ={
          headers:{
              Authorization: `${data.token}`
          }
      };
      const response = await api.patch(`/user/${data._id}`, formData, config);
      
      alert("Usuario atualizado com sucesso");
      return response.data.data;
  }catch(error){
      alert(error);
  }
});

const deleteUser = createAsyncThunk("user/deleteUserAsync", async (id) => {
  await axios.delete(`http://localhost:3004/users/${id}`);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLoggedUser: (state, action) => {
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
