import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home";

function App() {
  return (
    <>
      <h1 className="text-3xl text-center font-semibold">PET PALACE!</h1>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
