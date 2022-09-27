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

const noteReducer = (state = initialState, action) => {
  if (action.type === "NEW_NOTE") {
    return { ...state, notes: [...state.notes, action.data] };
  } else if (action.type === "TOGGLE_IMPORTANCE") {
    return {
      ...state,
      notes: state.notes.map((note) =>
        note.id === action.data.id
          ? { ...note, important: !note.important }
          : note
      ),
    };
  }

  return state;
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    data: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};

export default noteReducer;
