import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contnent: null,
  type: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return { content: null, type: null };
    },
  },
});

let timerId = null;

export const notify = (obj, time) => {
  if (timerId) clearTimeout(timerId);
  return (dispatch) => {
    dispatch(setNotification(obj));
    timerId = setTimeout(() => {
      dispatch(resetNotification());
    }, time * 1000);
  };
};

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
