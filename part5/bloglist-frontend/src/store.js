import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationSlice';
import userReducer from './reducers/userSlice';
import blogsReducer from './reducers/blogsSlice';
import usersReducer from './reducers/usersSlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogsReducer,
    users: usersReducer,
  },
});
