// En el componente Products
import { useState } from "react";
import searchIcon from "../../assets/searchIcon-24x24.png";
import { useNavigate } from 'react-router-dom'
import ResetFilter from '../../assets/resetfilter.png';
import PlusIcon from '../../assets/plusicon.png'
import AllProducts from '../../components/Admin/products/Products';
import useGetProducts from "../../hooks/products/useGetProducts";

const Products = () => {
  const [sortRating, setSortRating] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const { productsData } = useGetProducts(sortRating, sortPrice, search); // Pasar los estados como parámetros

  const navigateToCreate = () => {
    return navigate("/admin/products/new")
  }

  const handleSortRatingChange = (e) => {
    setSortRating(e.target.value);
  };

  const handleSortPriceChange = (e) => {
    setSortPrice(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleReset = () => {
    setSortRating("");
    setSortPrice("");
    setSearch("");
  }

  return (
    <>
      <div className='border-b-2 border-[#A1A2A2] mb-4'>
        <h1 className='font-semibold text-2xl pb-1'>Products</h1>
      </div>
      <div className='flex gap-4'>
        <form className="flex">
          <input
            type="search"
            placeholder="Search for products"
            value={search}
            onChange={handleSearchChange}
            className="py-2 px-4 w-[200px] h-[33px] border border-gray-300 rounded-l focus:outline-none"
          />
          <button type="submit" className="bg-violetahome h-[33px] py-2 px-4 rounded-r">
            <img src={searchIcon} alt="Search Icon" className="w-6 h-6" />
          </button>
        </form>
        <label htmlFor="sortRating" className="mx-2">
          Sort by Rating:
        </label>
        <select
          id="sortRating"
          className="mr-2 px-2 py-1 w-[100px] h-[33px] border border-gray-300 rounded-md text-black"
          value={sortRating}
          onChange={handleSortRatingChange}
        >
          <option value="">None</option>
          <option value="DESC">Highest Rating</option>
          <option value="ASC">Lowest Rating</option>
        </select>
        <label htmlFor="sortPrice" className="mx-2">
          Sort by Price:
        </label>
        <select
          id="sortPrice"
          className="mr-2 px-2 py-1 w-[100px] h-[33px] border border-gray-300 rounded-md text-black"
          value={sortPrice}
          onChange={handleSortPriceChange}
        >
          <option value="">None</option>
          <option value="DESC">Highest Price</option>
          <option value="ASC">Lowest Price</option>
        </select>
        <button
          className='border-2 border-violetamain rounded-lg w-[33px] h-[33px] flex items-center justify-center font-semibold text-violetamain'
          onClick={handleReset}
        >
          <img src={ResetFilter} />
        </button>
        <button onClick={navigateToCreate}
          className='border-2 border-violetamain rounded-lg w-[33px] h-[33px] flex items-center justify-center font-semibold text-violetamain'>
          <img src={PlusIcon} />
        </button>
      </div>
      <AllProducts productsData={productsData} />
    </>
  );
};

export default Products;
