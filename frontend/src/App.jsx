import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./Views/Home";
import Products from "./Views/Admin/Products";
import About from "./Views/About";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin/products" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
      </Routes>
    </>
  );
}

export default App;
