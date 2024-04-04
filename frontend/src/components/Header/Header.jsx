import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../Search Bar/SearchBar";
import { NavBar } from "../Nav Bar/NavBar";
import Cart from "../Cart/Cart";
import BackgroundBlur from "../BackgroundBlur/BackgroundBlur";
import CartIcon from "../../assets/cart-24x24.png";
import logo from "../../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({ allCategories, setProducts, filters }) => {
  const [openCart, setOpenCart] = useState(false);
  // const [openUser, setOpenUser] = useState(false);
  // const [userHoverTimeout, setUserHoverTimeout] = useState(null);
  const { search, setSearch } = filters;
  const { isAuthenticated, user } = useAuth0();

  // const handleUserHover = () => {
  //   setUserHoverTimeout(setTimeout(() => {
  //     setOpenUser(true);
  //   }, 1000));
  // };

  // const handleUserLeave = () => {
  //   clearTimeout(userHoverTimeout);
  //   setUserHoverTimeout(null);
  //   setOpenUser(false);
  // };

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
          <button onClick={() => setOpenCart(!openCart)} className="ml-4 relative">
            <img src={CartIcon} alt="" />
            {openCart && (
              <BackgroundBlur onClick={() => setOpenCart(!openCart)}>
                <Cart openCart={openCart} />
              </BackgroundBlur>
            )}
          </button>
          {isAuthenticated && (
            <div
              className="ml-4 rounded-full overflow-hidden"
            // onMouseEnter={handleUserHover}
            // onMouseLeave={handleUserLeave}
            >
              <Link to="/profile">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 cursor-pointer"
                />
              </Link>
              {/* {openUser && (
                <button className="absolute bg-white shadow-md py-2 px-4 top-10 right-0 z-10">
                  <Link to="/profile" className="block mb-2">Perfil</Link>
                  <Link to="/purchases" className="block">Compras</Link>
                </button>
              )} */}
            </div>
          )}
        </div>
      </div>
      <NavBar allCategories={allCategories} />
    </>
  );
};

export default Header;
