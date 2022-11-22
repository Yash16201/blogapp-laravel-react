import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service"

export interface AuthState {
    user?: any
    isLoggedIn: boolean
}
  
const initialState: AuthState = {
    isLoggedIn : false
}

export const register = createAsyncThunk(
    "auth/register",
    async (data:{}, thunkAPI) => {
      try {
        const response = await AuthService.register(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error:any) {
        if(error.response.status===422){
            const message = error.response.data.errors 
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }else{
            Swal.fire({
              text:error.response.data.message,
              icon:"error"
            })
        }
      }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data:any, thunkAPI) => {
      try {
        const response = await AuthService.login(data);
        // console.log(response);
        // console.log(response.user);
        
        return response.user;
      } catch (error:any) {
        if(error.response.status===422){
            const message = error.response.data.errors
            console.log(message);
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action ) => {
            state.isLoggedIn = false;
        });
        builder.addCase(register.rejected, (state, action ) => {
            state.isLoggedIn = false;
        });
        builder.addCase(login.fulfilled, (state, action:PayloadAction<any>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action ) => {
            state.isLoggedIn = false;
            state.user = {};
        });
        builder.addCase(logout.fulfilled, (state, action ) => {
            state.isLoggedIn = false;
            state.user = {};
        });
    },
    
});
  
const { reducer } = authSlice;
export default reducer;