import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../services/notes";

export const initializeNotes = createAsyncThunk(
  "notes/fetchNotes",
  async () => {
    const data = await noteService.getAll();
    return data;
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeNotes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

//MANUAL THUNK (STILL USES REDUX THUNK LIBRARY)
export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};
export const { toggleImportanceOf, appendNote } = noteSlice.actions;
export default noteSlice.reducer;
