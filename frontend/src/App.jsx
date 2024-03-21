import { useEffect, useState } from "react";

import { Route, Routes, NavLink } from "react-router-dom";

// * Routes
import Home from "./Views/Home";
import About from "./Views/About";
import Detail from "./Views/Detail";

// * Components
import Header  from "./components/Header/Header";

// * Admin panel
import AdminPanel from "./Views/Admin/AdminPanel";

// * Utils
import getCategories from './utils/getCategories.js'

function App() {

  const [ allCategories, setAllCategories ] = useState({
    all: [],
    // byId: {},
    // loading: false,
    error: ''
  })

  useEffect(() => {

    const get = async () => {
      const data = await getCategories()
      if(data.message) return setAllCategories({...allCategories, error:data.message})
      setAllCategories({...allCategories, all:data.categories})
    }

    get()

  }, [])

  return (
    <>
    <button
      onClick={() => console.log(allCategories)}
    >a</button>
      <Routes>
        
        <Route path='/*' element={<>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/detail" element={<Detail />}></Route>
          </Routes>
        </>}/>

        <Route path='/admin/*' element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
