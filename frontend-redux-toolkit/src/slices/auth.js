import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service"

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk("auth/register",
    async ({ name, email, gender, password }, thunkAPI) => {
      try {
        const response = await AuthService.register(name, email, gender, password);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error) {
        if(error.response.status===422){
            const message = error.response.data.errors 
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }else{
            Swal.fire({
              text:error.response.data.message,
              icon:"error"
            })
        }
        
      }
    }
);
export const login = createAsyncThunk("auth/login",
    async ({ email, password }, thunkAPI) => {
      try {
        const data = await AuthService.login(email, password);
        return { user: data };
      } catch (error) {
        if(error.response.status===422){
            const message = error.response.data.errors 
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }else{
            Swal.fire({
              text:error.response.data.message,
              icon:"error"
            })
        }
      }
    }
);
export const logout = createAsyncThunk(
    "auth/logout", 
    () => {
        AuthService.logoutUser();
    }
);

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action ) => {
            state.isLoggedIn = false;
        });
        builder.addCase(register.rejected, (state, action ) => {
            state.isLoggedIn = false;
        });
        builder.addCase(login.fulfilled, (state, action ) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        });
        builder.addCase(login.rejected, (state, action ) => {
            state.isLoggedIn = false;
            state.user = null;
        });
        builder.addCase(logout.fulfilled, (state, action ) => {
            state.isLoggedIn = false;
            state.user = null;
        });
    },
    
});
  
const { reducer } = authSlice;
export default reducer;
