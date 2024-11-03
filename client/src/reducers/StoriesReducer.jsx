export const storiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_STORIES":
      return { ...state, stories: action.payload, fetchError: null };
    case "SET_FETCH_ERROR":
      return { ...state, fetchError: action.payload };
    default:
      return state;
  }
};
