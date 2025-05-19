import { Header } from "./components/Header";

import "./App.css";
import { FilterPanel } from "./components/FilterPanel";

function App() {
  return (
    <>
      <Header title="Devices" />
      <FilterPanel />
    </>
  );
}

export default App;
