import { Header } from "./components/Header";

import "./App.css";
import { FilterPanel } from "./components/FilterPanel";
import { ListView } from "./components/ListView";
import { useMemo } from "react";
import { fetchApi } from "./Api";

function App() {
  const data = useMemo(fetchApi, []);
  return (
    <>
      <Header title="Devices" />
      <FilterPanel />
      <ListView data={data} />
    </>
  );
}

export default App;
