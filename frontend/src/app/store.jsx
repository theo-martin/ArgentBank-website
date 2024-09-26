import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import api from "../components/api";
import userReducer from "../reducer/UserSlice";
import authSlice from "../reducer/authSlice";
let state = {};
const store = configureStore({
  preloadedState: state,
  reducer: combineReducers({
    // setToken: authSlice.reducer,

    user: userReducer,
    [api.reducerPath]: api.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
