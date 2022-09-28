const filterReducer = (state = "ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    filter,
    type: "SET_FILTER",
  };
};

export default filterReducer;
