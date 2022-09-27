import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      content: "reducer defines how redux store works",
      important: true,
      id: 1,
    },
    {
      content: "state of store can contain any data",
      important: false,
      id: 2,
    },
  ],
  filter: "IMPORTANT",
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      state.notes.push({
        content,
        important: false,
        id: generateId(),
      });
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.notes.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return {
        ...state,
        notes: state.notes.map((note) => (note.id !== id ? note : changedNote)),
      };
    },
  },
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;
