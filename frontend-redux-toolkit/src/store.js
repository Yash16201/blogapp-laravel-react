import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import blogReducer from "./slices/blog";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  blog : blogReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;