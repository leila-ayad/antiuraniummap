import "./App.css";
import { Info } from "./components/info";
import { AddStory } from "./components/addStory";
import { MapComponent } from "./components/mapComponent";
import { StoriesProvider } from "./context/StoriesProvider.jsx";
function App() {
  return (
    <>
      <div id="title-container">
        <Info />
        <h2>Anti-Uranium Mapping Project</h2>
        <AddStory />
        <StoriesProvider>
          <MapComponent />
        </StoriesProvider>
      </div>
    </>
  );
}

export default App;
