import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    logged: false,
    user: {}
};

const addUser = createAsyncThunk('user/addUserAsync', async (data) => {
    const response = await axios.post("http://localhost:3004/users", data)
    return response.data;
});

const updateUser = createAsyncThunk("user/updateUserAsync", async (data) => {
    await axios.put(`http://localhost:3004/users/${data.id}`, data);
});

const deleteUser = createAsyncThunk("users/deleteUserAsync", async(id)=>{
    await axios.delete(`http://localhost:3004/users/${id}`);
});

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        addLoggedUser: (state, action) => { 
            state.logged = true;
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.logged = false;
            state.user = {};
        }
    }
})

export const { loginUser, logoutUser, addTraining, addLoggedUser } = userSlice.actions;

export { addUser, updateUser, deleteUser }

export default userSlice.reducer;