import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersServices from '../services/users';

const initialState = {
  users: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
};

export const initializeUsers = createAsyncThunk(
  'users/initializeUsers',
  async () => {
    const users = await usersServices.getAll();
    return users;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(...action.payload);
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export default usersSlice.reducer;
