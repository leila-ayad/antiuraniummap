import "./App.css";
import { Info } from "./components/info";
import { StoryForm } from "./components/storyForm";
import { MapComponent } from "./components/mapComponent";
import { StoriesProvider } from "./context/StoriesProvider.jsx";
import { FormProvider } from "./context/FormProvider.jsx";

function App() {
  return (
    <>
      <div id="title-container">
        <Info />
        <h2>Anti-Uranium Mapping Project</h2>
        <FormProvider>
          <StoryForm />
        </FormProvider>
      </div>
      <StoriesProvider>
        <MapComponent />
      </StoriesProvider>
    </>
  );
}

export default App;
