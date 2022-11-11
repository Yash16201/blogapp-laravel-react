import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import Swal from "sweetalert2";
import BlogService from "../services/blog.service"

const user = JSON.parse(localStorage.getItem("user"));

export const addBlog = createAsyncThunk("blog/add",
    async (data, thunkAPI) => {
        try {
            const response = await BlogService.addBlog(data);
            // thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            console.log(error);
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
export const editBlog = createAsyncThunk("blog/edit",
    async (data, thunkAPI) => {
        try {
            const response = await BlogService.editblog(data);
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

export const fetchblogs = createAsyncThunk("blog/fetch",
async (thunkAPI) => {
    try {
        const response = await BlogService.fetchBlogs();
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response;
    } catch (error) {
        Swal.fire({
            text:error.response.data.message,
            icon:"error"
        })
    }
}  
);

export const fetchblogbyid = createAsyncThunk("blog/fetchbyid",
async (id, thunkAPI) => {
    try {
        const response = await BlogService.fetchBlogById(id);
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response;
    } catch (error) {
        Swal.fire({
            text:error.response.data.message,
            icon:"error"
        })
    }
}  
);

export const search = createAsyncThunk("blog/search",
async (Search, thunkAPI) => {
    try {
        const response = await BlogService.livesearch(Search);
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response;
    } catch (error) {
        console.log(error);
        Swal.fire({
            text:error.response.data.message,
            icon:"error"
        })
    }
}  
);

export const delblog = createAsyncThunk("blog/delete",
async (id, thunkAPI) => {
    try {
        const response = await BlogService.deleteblog(id);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        Swal.fire({
            text:error.response.data.message,
            icon:"error"
        })
    }
}  
);

const initialState = {blog : [], single_blog :[]};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addBlog.fulfilled, (state, action ) => {
        //    state.push(action.payload) 
        });
        builder.addCase(addBlog.rejected, (state, action ) => {
            state.push(action.payload)
        });
        builder.addCase(editBlog.fulfilled, (state, action ) => {
            //    state.push(action.payload) 
        });
        builder.addCase(editBlog.rejected, (state, action ) => {
            state.push(action.payload)
        });
        builder.addCase(search.fulfilled, (state, action ) => {
            state.blog = action.payload
        });
        builder.addCase(search.rejected, (state, action ) => {
            // state.push(action.payload)
        });
        builder.addCase(fetchblogs.fulfilled, (state, action ) => {
            state.blog = action.payload
            state.single_blog = []
        });
        builder.addCase(fetchblogs.rejected, (state, action ) => {
            state.blog = []
            state.single_blog = []
        });
        builder.addCase(fetchblogbyid.fulfilled, (state, action ) => {
            state.single_blog = action.payload
        });
        builder.addCase(fetchblogbyid.rejected, (state, action ) => {
            state.single_blog = []
        });
    },  
});
  
const { reducer } = blogSlice;
export default reducer;

