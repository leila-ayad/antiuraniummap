import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="map"></div>

      <div id="form-container">
        <form>
          <label for="location">Location:</label>
          <br />
          <input type="text" id="location" name="location" />
          <br />
          <br />

          <label for="story">Story:</label>
          <br />
          <textarea id="story" name="story" rows="4" cols="50"></textarea>
          <br />
          <br />

          <label for="photo">Photo:</label>
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
