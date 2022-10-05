import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogServices from '../services/blogs';

const initialState = {
  blogs: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
};

export const saveBlog = createAsyncThunk(
  'blogs/saveBlog',
  async (blogToSave) => {
    const saved = await blogServices.createBlog(blogToSave);
    return saved;
  }
);

export const initializeBlogs = createAsyncThunk(
  'blogs/initializeBlogs',
  async () => {
    const blogs = await blogServices.getAll();
    return blogs;
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlogById',
  async (blog) => {
    await blogServices.deleteBlog(blog.id);
    return blog;
  }
);

export const likeBlog = createAsyncThunk('blogs/likeBlog', async (blog) => {
  await blogServices.like(blog.id, blog.likes + 1);
  return { ...blog, likes: blog.likes + 1 };
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(initializeBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(...action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const { id } = action.payload;
        const blogs = state.blogs.filter((blog) => blog.id !== id);
        return { ...state, blogs };
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const { id } = action.payload;
        const blogs = state.blogs.filter((blog) => blog.id !== id);
        return { ...state, blogs: [...blogs, action.payload] };
      });
  },
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const getBlogsStatus = (state) => state.blogs.status;

export default blogSlice.reducer;
