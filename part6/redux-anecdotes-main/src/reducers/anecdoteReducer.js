import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import anecdotes from "../services/anecdotes";

export const initializeAnecdotes = createAsyncThunk(
  "anecdotes/fetchData",
  async () => {
    const data = await anecdotes.getAll();
    return data;
  }
);

export const createAnecdote = createAsyncThunk(
  "anecdotes/createAnecdote",
  async (entry) => {
    const data = await anecdotes.createNew(entry);
    return data;
  }
);

export const saveVote = createAsyncThunk("anecdotes/vote", async (anecdote) => {
  const response = await anecdotes.voteAnecdote(anecdote);
  return response;
});

export const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    vote: (state, action) => {
      return state.map((el) =>
        el.id === action.payload ? { ...el, votes: el.votes + 1 } : el
      );
    },
    addAnecdote: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(saveVote.fulfilled, (state, action) => {
        return state.map((el) =>
          el.id === action.payload.id ? { ...el, votes: el.votes + 1 } : el
        );
      });
  },
});

export const { addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
