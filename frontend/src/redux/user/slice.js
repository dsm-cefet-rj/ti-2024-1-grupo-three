import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //ações que vão alterar esse reducer
  },
});
