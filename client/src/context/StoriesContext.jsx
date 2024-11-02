import { createContext, useContext } from "react";

export const StoriesContext = createContext();

//custom hook to useStories with useContext
export const useStories = () => useContext(StoriesContext);
