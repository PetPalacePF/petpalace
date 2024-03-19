import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./Views/Home";
import Products from "./Views/Admin/Products";

function App() {
  return (
    <>
      <h1 className="text-3xl text-center font-semibold">PET PALACE!</h1>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin/products" element={<Products />}></Route>
      </Routes>
    </>
  );
}

export default App;
