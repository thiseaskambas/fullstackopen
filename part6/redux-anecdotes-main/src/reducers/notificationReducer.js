import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
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
export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
