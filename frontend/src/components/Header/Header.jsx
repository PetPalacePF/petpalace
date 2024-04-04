import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../Search Bar/SearchBar";
import { NavBar } from "../Nav Bar/NavBar";

import AsideCart from "../AsideCart/AsideCart";
import BackgroundBlur from "../BackgroundBlur/BackgroundBlur";
import CartIcon from "../../assets/cart-24x24.png";
import logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";

const Header = ({ allCategories, setProducts, search, setSearch }) => {

  const { pathname }  = useLocation()
  const navigate = useNavigate()
  const [openCart, setOpenCart] = useState(false);
  const [ showCart, setShowCart ] = useState(false)

  const handleClick = () => {
    setShowCart(false)
    setTimeout(() => {
      setOpenCart(false)
    }, 200)
  }

  const handleClickBuy = () => {
    handleClick()
    return navigate('/cart')
  } 

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
          <button disabled={pathname.includes('cart')} onClick={() => setOpenCart(!openCart)} className="ml-4 relative cursor-pointer">
            <img src={CartIcon} alt="" />
          </button>
          {openCart && (
            <BackgroundBlur onClick={handleClick} showCart={showCart} >
              <AsideCart handleClickClose={handleClick} handleClickBuy={handleClickBuy} openCart={openCart} setOpenCart={setOpenCart} showCart={showCart} setShowCart={setShowCart} />
            </BackgroundBlur>
          )}
        </div>
      </div>
      <NavBar allCategories={allCategories} />
    </>
  );
};

export default Header;
