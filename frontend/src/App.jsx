/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";

// * Routes
import Home from "./Views/Home";
import About from "./Views/About";
import Detail from "./Views/Detail";

// * Components
import Header from "./components/Header/Header";

// * Admin panel
import AdminPanel from "./Views/Admin/AdminPanel";

// * Utils
import getCategories from './utils/getCategories.js'
import { Shop } from "./components/Shop/Shop.jsx";

function App() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const [filterCategories, setFilterCategories] = useState([])
  const [filterPrice, setFilterPrice] = useState([])
  const [sortRating, setSortRating] = useState("");
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState({
    allIds: [],
    byId: {},
    loading: false,
    error: ''
  })

  useEffect(() => {

    const get = async () => {
      setAllCategories({ ...allCategories, loading: true })
      const data = await getCategories()
      setAllCategories({ ...allCategories, loading: false })

      if (data.message) return setAllCategories({ ...allCategories, error: data.message })

      const allIds = data.map(category => category.id)
      const byId = data.reduce((acc, category) => {
        acc[category.id] = category
        return acc
      }, {})

      setAllCategories({
        allIds,
        byId,
        loading: false,
        error: ''
      })
    }

    get()

  }, [])

  return (
    <>
      <Routes>
        <Route path='/*' element={<>
          <Header allCategories={allCategories} setProducts={setProducts} search={search} setSearch={setSearch} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/shop" element={<Shop
              allCategories={allCategories}
              search={search} setSearch={setSearch}
              products={products} setProducts={setProducts}
              filterCategories={filterCategories} setFilterCategories={setFilterCategories}
              filterPrice={filterPrice} setFilterPrice={setFilterPrice}
              sortRating={sortRating} setSortRating={setSortRating}
            />}></Route>
          </Routes>
        </>} />

        <Route path='/admin/*' element={<AdminPanel allCategories={allCategories} />} />
      </Routes>
    </>
  );
}

export default App;
