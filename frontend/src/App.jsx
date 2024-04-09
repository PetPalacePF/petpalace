/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";

// * Routes
import Home from "./Views/Home";
import About from "./Views/About";
import Detail from "./Views/Detail";
import Contact from "./Views/Contact.jsx";

// * Components
import Header from "./components/Header/Header";

// * Admin panel
import AdminPanel from "./Views/Admin/AdminPanel";

// * Utils
import getCategories from "./utils/getCategories.js";
import { Shop } from "./Views/Shop.jsx";
import Cart from "./Views/User/Cart.jsx";
import useFilters from "./hooks/useFilter.jsx";
import { Profile } from "./Views/Users/Profile.jsx";

function App() {
  const [products, setProducts] = useState([]);
  // const [users, setUsers] = useState();
  const filters = useFilters();

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState({
    allIds: [],
    byId: {},
    loading: false,
    error: "",
  });

  useEffect(() => {
    const get = async () => {
      setAllCategories({ ...allCategories, loading: true });
      const data = await getCategories();
      setAllCategories({ ...allCategories, loading: false });

      if (data.message)
        return setAllCategories({ ...allCategories, error: data.message });

      const allIds = data.map((category) => category.id);
      const byId = data.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
      }, {});

      setAllCategories({
        allIds,
        byId,
        loading: false,
        error: "",
      });
    };

    get();
  }, []);

  return (
    <div className="">
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header
                allCategories={allCategories}
                setProducts={setProducts}
                filters={filters}
                // setUsers={setUsers}
              />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route
                  path="/detail/:id"
                  element={<Detail />}
                ></Route>
                <Route
                  path="/shop"
                  element={
                    <Shop
                      allCategories={allCategories}
                      products={products}
                      setProducts={setProducts}
                      filters={filters}
                    />
                  }
                ></Route>
                <Route path="/profile/*" element={<Profile />}></Route>
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />}></Route>
              </Routes>
            </>
          }
        />

        <Route
          path="/admin/*"
          element={<AdminPanel allCategories={allCategories} />}
        />
      </Routes>
    </div>
  );
}

export default App;
