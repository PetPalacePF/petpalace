/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../Search Bar/SearchBar";
import { NavBar } from "../Nav Bar/NavBar";

import Cart from "../Cart/Cart";
import BackgroundBlur from '../BackgroundBlur/BackgroundBlur'

const Header = ({ allCategories, setProducts, search, setSearch }) => {

  const [ openCart, setOpenCart ] = useState(false)

  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <Link to='/'>🐾PET PALACE</Link>
        <div className="flex items-center">
          <SearchBar setProducts={setProducts} search={search} setSearch={setSearch} />
          <button onClick={() => setOpenCart(!openCart)} className="ml-4">🛒MY CART</button>
          {
            openCart &&
            <BackgroundBlur onClick={() => setOpenCart(!openCart)}>
              <Cart openCart={openCart} /> 
            </BackgroundBlur>
          }
        </div>
      </div>
      <NavBar allCategories={allCategories} />
    </>
  )
}

export default Header
