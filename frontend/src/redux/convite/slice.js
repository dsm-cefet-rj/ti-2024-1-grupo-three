import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CreateAxiosInstance from "../../utils/api";
import { getAuthConfig } from '../../utils/api';

const api = CreateAxiosInstance();

const initialState = {
  convitesTime: [],
  convitesTorneio: [],
  loading: false,
  error: null,
};


export const verificarConviteExistente = createAsyncThunk(
  "convites/verificarConviteExistente",
  async ({ destinatarioId, remetenteId, token }, { rejectWithValue }) => {
    try {
      const config = getAuthConfig(token); // Adicionando o token
      const response = await api.get(`/convite/destinatario/${destinatarioId}`, config);

      if (response && response.data.length > 0) {
        const conviteExistente = response.data.some(
          (convite) => convite.usuarioRemetente === remetenteId
        );
        return conviteExistente; 
      }
      return false;
    } catch (error) {
      console.error("Erro ao verificar convite existente:", error);
      return rejectWithValue("Erro ao verificar convite");
    }
  }
);

export const fetchConvitesUsuario = createAsyncThunk(
  'convites/fetchConvitesUsuario',
  async ({ userId, token }) => {
    const config = getAuthConfig(token); // Adicionando o token
    const response = await api.get(`/convite?idDestinatario=${userId}`, config);
    return response.data;
  }
);

export const fetchConvitesTime = createAsyncThunk(
  'convites/fetchConvitesTime',
  async ({ timeId, token }) => {
    const config = getAuthConfig(token); // Adicionando o token
    const response = await api.get(`/convite/time/${timeId}`, config);
    return response.data;
  }
);

export const addCoviteAsync = createAsyncThunk(
  'convites/addConviteAsync',
  async ({data, token}) => {
    console.log("DATA: %o", data)
    const config = getAuthConfig(token); // Adicionando o token
    try {
      const response = await api.post("/convite", data, config);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar o convite:", error);
      throw error;
    }
  }
);

export const aceitarConvite = createAsyncThunk(
  'convites/aceitarConvite',
  async ({ conviteId, token }) => {
    const config = getAuthConfig(token); // Adicionando o token
    try{
      const response = await api.put(`/convite/aceitar/${conviteId}`, {}, config);
    } catch (error){
      console.error("Erro ao aceitar o convite:", error);
      throw error;
    }
    
    alert("Convite aceito com sucesso!");
    return response.data;
  }
);

export const recusarConvite = createAsyncThunk(
  'convites/recusarConvite',
  async ({ conviteId, token }) => {
    const config = getAuthConfig(token); // Adicionando o token
    const response = await api.delete(`/convite/${conviteId}`, config);
    alert("Convite recusado com sucesso!");
    return conviteId;
  }
);


const conviteSlice = createSlice({
  name: 'convites',
  initialState,
  reducers: {
    clearConvites(state) {
      state.convitesTime = [];
      state.convitesTorneio = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConvitesUsuario.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConvitesUsuario.fulfilled, (state, action) => {
        state.convitesTime = action.payload.filter((convite) => convite.tipoConvite === 'usuario_para_usuario');
        state.loading = false;
      })
      .addCase(fetchConvitesUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchConvitesTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConvitesTime.fulfilled, (state, action) => {
        state.convitesTorneio = action.payload.filter((convite) => convite.tipoConvite === 'torneio_para_time');
        state.loading = false;
      })
      .addCase(fetchConvitesTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Aceitar Convite
      .addCase(aceitarConvite.fulfilled, (state, action) => {
        // Remover o convite aceito da lista
        state.convitesTime = state.convitesTime.filter(convite => convite._id !== action.payload._id);
        state.convitesTorneio = state.convitesTorneio.filter(convite => convite._id !== action.payload._id);
      })
      // Recusar Convite
      .addCase(recusarConvite.fulfilled, (state, action) => {
        // Remover o convite recusado da lista
        state.convitesTime = state.convitesTime.filter(convite => convite._id !== action.payload);
        state.convitesTorneio = state.convitesTorneio.filter(convite => convite._id !== action.payload);
      });
  },
});

// Exportando ações e reducer
export const { clearConvites } = conviteSlice.actions;
export default conviteSlice.reducer;
