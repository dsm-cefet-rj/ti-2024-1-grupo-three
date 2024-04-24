import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    idConvite: "", //qual o id do Convite
    idTimeConvite: "",  //o convidado está sendo convidado para qual time?
    idCriadorConvite:"", //quem está convidando
    nomeDestinatario:"", //quem vai receber o convite
  };

const enviarConviteAsync = createAsyncThunk("convite/enviarConviteAsync", async (data) => {
  const response = await axios.post("http://localhost:3004/convites", data);
  return response.data;
});

const cancelarConviteAsync = createAsyncThunk("convite/cancelarConviteAsync", async (idConvite) => {
  await axios.delete(`http://localhost:3004/convites/${idConvite}`);
  return idConvite;
});

const aceitarConviteAsync = createAsyncThunk("convite/aceitarConviteAsync", async (idConvite) => {
  const response = await axios.put(`http://localhost:3004/convites/${idConvite}`, { status: "aceito" });
  return response.data;
});

const recusarConviteAsync = createAsyncThunk("convite/recusarConviteAsync", async (idConvite) => {
  const response = await axios.put(`http://localhost:3004/convites/${idConvite}`, { status: "recusado" });
  return response.data;
});

const conviteSlice = createSlice({
  name: "convite",
  initialState,
  reducers: {
    clearConvite: (state) => {
      state.idConvite = "";
      state.idTimeConvite = "";
      state.idCriadorConvite = "";
      state.nomeDestinatario = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enviarConviteAsync.fulfilled, (state, action) => {
        const { id, idTimeConvite, idCriadorConvite, nomeDestinatario } = action.payload;
        state.idConvite = id;
        state.idTimeConvite = idTimeConvite;
        state.idCriadorConvite = idCriadorConvite;
        state.nomeDestinatario = nomeDestinatario;
      })
      .addCase(cancelarConviteAsync.fulfilled, (state, action) => {
        const idConviteCancelado = action.payload;
        if (state.idConvite === idConviteCancelado) {
          state.idConvite = "";
          state.idTimeConvite = "";
          state.idCriadorConvite = "";
          state.nomeDestinatario = "";
        }
      })
      .addCase(aceitarConviteAsync.fulfilled, (state) => {
        state.idConvite = "";
        state.idTimeConvite = "";
        state.idCriadorConvite = "";
        state.nomeDestinatario = "";
      })
      .addCase(recusarConviteAsync.fulfilled, (state) => {
        state.idConvite = "";
        state.idTimeConvite = "";
        state.idCriadorConvite = "";
        state.nomeDestinatario = "";
      });
  },
});

export const { clearConvite } = conviteSlice.actions;

export { enviarConviteAsync, cancelarConviteAsync, aceitarConviteAsync, recusarConviteAsync };

export default conviteSlice.reducer;
