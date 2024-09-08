import { useState, useEffect } from "react";

import "./App.css";
import supabase from "../config/supabaseClient";

function App() {
  const [fetchError, setFetchError] = useState(null);
  const [stories, setStories] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase.from("stories").select();
      if (error) {
        setFetchError("Error:", error);
        setStories(null);
      }
      if (data) {
        setStories(data);

        setFetchError(null);
      }
    };

    fetchStories();
  }, []);

  return (
    <>
      <div id="map"></div>
      {stories && (
        <div>
          {stories.map((story) => (
            <p key={story.id}>{story.story_body}</p>
          ))}
        </div>
      )}
      <div id="form-container">
        <form>
          <label>Location:</label>
          <br />
          <input type="text" id="location" name="location" />
          <br />
          <br />

          <label>Story:</label>
          <br />
          <textarea id="story" name="story" rows="4" cols="50"></textarea>
          <br />
          <br />

          <label>Photo:</label>
          <br />
          <input type="file" id="photo" name="photo" />
          <br />
          <br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default App;
