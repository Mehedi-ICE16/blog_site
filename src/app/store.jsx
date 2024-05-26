import { configureStore } from '@reduxjs/toolkit';
import addBlogReducer from '../features/blog/postSlice';
import getBlogReducer from '../features/blog/getSlice';

export const store = configureStore({
    reducer: {
        addBlogSlice: addBlogReducer,
        blog: getBlogReducer
    }
})