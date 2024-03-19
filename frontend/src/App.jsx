import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import Products from "./Views/Admin/Products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin/products" element={<Products />}></Route>
      </Routes>
    </>
  );
}

export default App;
