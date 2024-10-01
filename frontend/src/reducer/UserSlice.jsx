import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  username: "", // Valeur par défaut pour username
});
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: usersAdapter.updateOne,
    updateUser: usersAdapter.updateOne,
    updateUsername: (state, action) => {
      usersAdapter.updateOne(state, {
        id: action.payload.userId,
        changes: { username: action.payload.newUsername },
      });
    },
  },
});

export const { setUser, updateUser, updateUsername } = userSlice.actions;
export default userSlice.reducer;
