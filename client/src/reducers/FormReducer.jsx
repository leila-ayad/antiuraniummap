//the reducer is just a function with a switch statement that takes the app state and action (event-driven) that you pass to useReducer
//to really turn it into a fancy react thing
export const formReducer = (state, action) => {
  switch (action.type) {
    //makes a copy of the state object, then merges the current formData with the incoming payload to update state
    case "TOGGLE_FORM_VISIBILITY":
      return !state.isVisible;

    case "SET_FORM_DATA":
      console.log(action, state);
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "RESET_FORM":
      return { ...state, formData: { location: "", story: "", photo: null } };
    default:
      return state;
  }
};
