import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const initialState = {
  user: null,
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
};

export const logUserIn = createAsyncThunk('user/logIn', async (userToLog) => {
  const loggedUser = await blogService.logIn(userToLog);
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser));
  blogService.setToken(loggedUser.token);
  return loggedUser;
});

export const findUserFromToken = createAsyncThunk(
  'user/findFromStoredToken',
  async () => {
    const loggedUserJSON = await window.localStorage.getItem(
      'loggedBlogappUser'
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      return user;
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUserOut() {
      window.localStorage.removeItem('loggedBlogappUser');
      blogService.setToken(null);
      return null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logUserIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(findUserFromToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const selectUser = (state) => state.user.user;
export const getUserStatus = (state) => state.user.status;

export const { logUserOut } = userSlice.actions;
export default userSlice.reducer;
