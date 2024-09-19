import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null, // Initialisation du token à null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // Mise à jour du token
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
