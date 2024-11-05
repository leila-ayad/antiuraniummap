import { useReducer, useEffect } from "react";
import { StoriesContext } from "./StoriesContext.jsx";
import { storiesReducer } from "../reducers/StoriesReducer.jsx";
import supabase from "../../config/supabaseClient";

export const StoriesProvider = ({ children }) => {
  const initialState = {
    stories: null,
    fetchError: null,
  };

  const [state, dispatch] = useReducer(storiesReducer, initialState);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase.from("stories").select();
      //filter to only pass along stories that have been approved
      const approvedStories = data.filter((story) => story.approved);
      if (error) {
        dispatch({
          type: "SET_FETCH_ERROR",
          payload: `Error: ${error.message}`,
        });
      } else {
        dispatch({ type: "SET_STORIES", payload: approvedStories });
      }
    };

    fetchStories();
  }, []);

  return (
    <StoriesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoriesContext.Provider>
  );
};
