import axios from "axios";

const client = axios.create({ baseURL: 'http://localhost:8000/' });

export  const addBlog = async (blog) => {
    console.log(blog);
    const response = await client.post('blogs', blog);
    return response.data;
}

export const getBlogs = async () => { 
    const response = await client.get('blogs');
    return response.data;
}

