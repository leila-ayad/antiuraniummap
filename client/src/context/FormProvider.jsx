import { useReducer } from "react";
import { FormContext } from "./FormContext.jsx";
import { formReducer } from "../reducers/FormReducer.jsx";

export const FormProvider = ({ children }) => {
  const initialState = {
    formData: { location: "", story: "", photo: null },
  };

  //useReducer returns an array
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};