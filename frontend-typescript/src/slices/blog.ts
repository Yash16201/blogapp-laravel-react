import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import Swal from "sweetalert2";
import BlogService from "../services/blog.service"

export const addBlog = createAsyncThunk("blog/add",
    async (data:any, thunkAPI) => {
        try {
            const response = await BlogService.addBlog(data);
            return response.data;
        } catch (error:any) {
            console.log(error);
            if(error.response.status===422){
                const message = error.response.data.errors 
                thunkAPI.dispatch(setMessage(message));
                return thunkAPI.rejectWithValue(message);
            }else{
                Swal.fire({
                  text:error.response.data.message,
                  icon:"error"
                })
                return thunkAPI.rejectWithValue(error);
            }  
        }
    }  
);

export const editBlog = createAsyncThunk("blog/edit",
    async (data:any, thunkAPI) => {
        try {
            const response = await BlogService.editblog(data);
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
                return thunkAPI.rejectWithValue(error);
            }  
        }
    }  
);

export const fetchblogs = createAsyncThunk("blog/fetch",
async (thunkAPI) => {
    try {
        const response = await BlogService.fetchBlogs();
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response;
    } catch (error:any) {
        Swal.fire({
            text:error.response.data.message,
            icon:"error"
        })
    }
}  
);

export const fetchblogbyid = createAsyncThunk("blog/fetchbyid",
async (id:any, thunkAPI) => {
    try {
        const response = await BlogService.fetchBlogById(id);
        return response;
    } catch (error:any) {
        Swal.fire({
            text:error.response.data.message,
            icon:"error"
        })
        return thunkAPI.rejectWithValue(error);
    }
}  
);

export const search = createAsyncThunk("blog/search",
async (Search:string, thunkAPI) => {
    try {
        const response = await BlogService.livesearch(Search);
        return response;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error);
        Swal.fire({
            text:error.response.data.message,
            icon:"error"
        })
    }
}  
);

export const delblog = createAsyncThunk("blog/delete",
async (id:any, thunkAPI) => {
    try {
        const response = await BlogService.deleteblog(id);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error);
        Swal.fire({
            text:error.response.data.message,
            icon:"error"
        })
    }
}  
);

export interface BlogState {
    blog ?: [],
    singleBlog ?: []
}
  
const initialState: BlogState = {
    blog : [],
    singleBlog : []
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(addBlog.fulfilled, (state, action ) => {
        //    state.push(action.payload) 
        });
        builder.addCase(addBlog.rejected, (state:any, action:PayloadAction<any> ) => {
            state.push(action.payload)
        });
        builder.addCase(editBlog.fulfilled, (state, action ) => {
            //    state.push(action.payload) 
        });
        builder.addCase(editBlog.rejected, (state:any, action:PayloadAction<any> ) => {
            state.push(action.payload)
        });
        builder.addCase(search.fulfilled, (state, action:PayloadAction<any> ) => {
            state.blog = action.payload
        });
        builder.addCase(search.rejected, (state, action ) => {
            // state.push(action.payload)
        });
        builder.addCase(fetchblogs.fulfilled, (state:any, action:PayloadAction<any> ) => {
            state.blog = action.payload
            state.singleBlog = []
        });
        builder.addCase(fetchblogs.rejected, (state:any, action:PayloadAction<any> ) => {
            state.blog = []
            state.singleBlog = []
        });
        builder.addCase(fetchblogbyid.fulfilled, (state:any, action:PayloadAction<any> ) => {
            state.singleBlog = action.payload
        });
        builder.addCase(fetchblogbyid.rejected, (state:any, action ) => {
            state.singleBlog = []
        });
    },  
});
  
const { reducer } = blogSlice;
export default reducer;