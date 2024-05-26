import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getBlogs } from "./api";

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    error: '',
}

export const getBlog = createAsyncThunk(
    'getBlog', async () => {
        const response = await getBlogs();
        return response;
    }
)

const getBlogSlice = createSlice({
    name: 'blog',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBlog.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.blogs = action.payload;
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }
});

export default getBlogSlice.reducer;