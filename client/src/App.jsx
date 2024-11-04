import "./App.css";
import { Info } from "./components/info";
import { StoryForm } from "./components/storyForm";
import { MapComponent } from "./components/mapComponent";
import { StoriesProvider } from "./context/StoriesProvider.jsx";
import { FormProvider } from "./context/FormProvider.jsx";

function App() {
  return (
    <>
      <Info />
      <h2>Anti-Uranium Mapping Project</h2>
      <FormProvider>
        <StoryForm />
        <StoriesProvider>
          <MapComponent />
        </StoriesProvider>
      </FormProvider>
    </>
  );
}

export default App;
