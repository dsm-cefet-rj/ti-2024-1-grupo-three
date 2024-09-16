import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CreateAxiosInstance from "../../utils/api";

const api  = CreateAxiosInstance();

const initialState = {
    partidas : []
}

const addPartida = createAsyncThunk("partidas/addPartidasAsync", async(data) => {
    try{
        const response = await api.post("/partidas", data)
        alert("Partidas criadas!")
        return response.data;
    } catch (error){
        alert("Erro ao criar partida");
        return false;
    }
})

const getPartidas = createAsyncThunk("partidas/getPartidasAsync", async(data) => {
    const config = {
        headers: {
            Authorization: `${data.token}`,
        },
    };
    const response = await api.get(`/partidas/${data.idPartida}`, config);
    return response.data;
})

const partidaSlice = createSlice({
    name: "partidas",
    initialState,
    reducers: {
        addPartidas : (state, action) => {
            state.partidas = action.payload.partidas;
        }        
    }

})

export const { addPartidas } = partidaSlice.actions;

export { addPartida};

export default partidaSlice.reducer;