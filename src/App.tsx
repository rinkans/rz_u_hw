import { Route, Routes } from "react-router";

import { Header } from "./components/Header";

import { Products } from "./pages/Products";
import { Product } from "./pages/Product";

import "./App.css";

function App() {
  return (
    <>
      <Header title="Devices" />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
