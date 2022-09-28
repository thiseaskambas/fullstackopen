import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
};

const waitSome = (message, time) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: message }), time * 1000)
  );
};

export const setAsyncNotification = createAsyncThunk(
  "notification/setNotification",
  async ({ message, time }) => {
    const response = await waitSome(message, time);
    return response.data;
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAsyncNotification.pending, (state, { meta }) => {
        state.notification = meta.arg.message;
      })
      .addCase(setAsyncNotification.fulfilled, (state, action) => {
        state.notification = null;
      });
  },
});

export const selectNotification = (state) => state.notification;
export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
