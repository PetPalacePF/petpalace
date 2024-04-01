/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../Search Bar/SearchBar";
import { NavBar } from "../Nav Bar/NavBar";

import Cart from "../Cart/Cart";
import BackgroundBlur from "../BackgroundBlur/BackgroundBlur";
import CartIcon from "../../assets/cart-24x24.png";
import logo from "../../assets/logo.png";
const Header = ({ allCategories, setProducts, search, setSearch }) => {
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      <div className="mx-auto flex max-w-[1400px] h-[110px] items-center justify-between p-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Pet Palace Logo" className="w-8 h-8 mr-2" />
          <span className="text-lg">PET PALACE</span>
        </Link>
        <div className="flex items-center">
          <SearchBar
            setProducts={setProducts}
            search={search}
            setSearch={setSearch}
          />
          <button onClick={() => setOpenCart(!openCart)} className="ml-4">
            {" "}
            <img src={CartIcon} alt="" />
          </button>
          {openCart && (
            <BackgroundBlur onClick={() => setOpenCart(!openCart)}>
              <Cart openCart={openCart} />
            </BackgroundBlur>
          )}
        </div>
      </div>
      <NavBar allCategories={allCategories} />
    </>
  );
};

export default Header;
