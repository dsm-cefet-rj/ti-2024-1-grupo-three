// actions.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const buscarConvites = createAsyncThunk(
  "convites/buscarConvites",
  async () => {
    try {
      const response = await axios.get("http://localhost:3004/convites");
      return response.data;
    } catch (error) {
      throw Error("Erro ao buscar convites:", error);
    }
  }
);

export const adicionarConvite = createAsyncThunk(
  "convites/adicionarConvite",
  async (novoConvite) => {
    try {
      const response = await axios.post(
        "http://localhost:3004/convites",
        novoConvite
      );
      return response.data;
    } catch (error) {
      throw Error("Erro ao adicionar convite:", error);
    }
  }
);

export const removerConvite = createAsyncThunk(
  "convites/removerConvite",
  async (id) => {
    try {
      await axios.delete(`http://localhost:3004/convites/${id}`);
      return id;
    } catch (error) {
      throw Error("Erro ao remover convite:", error);
    }
  }
);

export const atualizarConvite = createAsyncThunk(
  "convites/atualizarConvite",
  async (conviteAtualizado) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/convites/${conviteAtualizado.id}`,
        conviteAtualizado
      );
      return response.data;
    } catch (error) {
      throw Error("Erro ao atualizar convite:", error);
    }
  }
);

const convitesSlice = createSlice({
  name: "convites",
  initialState: {
    convites: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Buscar Convites
      .addCase(buscarConvites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(buscarConvites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.convites = action.payload;
      })
      .addCase(buscarConvites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Adicionar Convite
      .addCase(adicionarConvite.fulfilled, (state, action) => {
        state.convites.push(action.payload);
      })
      // Remover Convite
      .addCase(removerConvite.fulfilled, (state, action) => {
        state.convites = state.convites.filter(
          (convite) => convite.id !== action.payload
        );
      })
      // Atualizar Convite
      .addCase(atualizarConvite.fulfilled, (state, action) => {
        const index = state.convites.findIndex(
          (convite) => convite.id === action.payload.id
        );
        if (index !== -1) {
          state.convites[index] = action.payload;
        }
      });
  },
});

export default convitesSlice.reducer;
