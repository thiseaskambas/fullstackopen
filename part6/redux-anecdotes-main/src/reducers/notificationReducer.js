import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: "notification text here",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;
