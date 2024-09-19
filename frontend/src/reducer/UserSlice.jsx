import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: usersAdapter.updateOne,
    updateUser: usersAdapter.updateOne,
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
