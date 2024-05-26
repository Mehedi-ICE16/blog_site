import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { addBlog } from "../../features/blog/api";

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    error: '',
}

export const postBlog = createAsyncThunk(
    'postBlog', async (blog) => {
        const response = await addBlog(blog);
        return response;
    }
)

const addBlogSlice = createSlice({
    name: 'blog',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(postBlog.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(postBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.blogs = action.payload;
            })
            .addCase(postBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export default addBlogSlice.reducer;
