/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { SearchBar } from "../Search Bar/SearchBar";
import { NavBar } from "../Nav Bar/NavBar";

const Header = ({ allCategories, setProducts, search, setSearch }) => {
  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <Link to='/'>🐾PET PALACE</Link>
        <div className="flex items-center">
          <SearchBar setProducts={setProducts} search={search} setSearch={setSearch} />
          <Link to="/cart" className="ml-4">🛒MY CART</Link>
        </div>
      </div>
      <NavBar allCategories={allCategories} />
    </>
  )
}

export default Header
