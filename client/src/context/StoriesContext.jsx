import { createContext, useContext } from "react";

export const StoriesContext = createContext();
console.log("storiesContext", StoriesContext);

//custom hook to useStories with useContext
export const useStories = () => useContext(StoriesContext);
