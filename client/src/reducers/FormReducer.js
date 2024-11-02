export const formReducer = (state, action) => {
  switch (action.type) {
    //makes a copy of the state object, then merges the current formData with the incoming payload to update state
    case "SET_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "RESET_FORM":
      return { ...state, formData: { location: "", story: "", photo: null } };
    default:
      return state;
  }
};
