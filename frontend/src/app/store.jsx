import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/Reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
