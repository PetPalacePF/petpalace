/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getFilteredProducts } from "../../utils/getAllProducts";
import { Card } from "../Cards/Card";

export const Shop = ({
  setProducts,
  products,
  allCategories,
  filterCategories,
  setFilterCategories,
  sortRating,
  setSortRating,
}) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    getFilteredProducts(setProducts, filterCategories, sortRating, priceRange);
  }, [setProducts, filterCategories, sortRating, priceRange]);

  console.log(filterCategories)

  const handleSortChange = (e) => {
    setSortRating(e.target.value);
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handleCategoryChange = (id) => {
    if (filterCategories.includes(id)) {
      setFilterCategories(filterCategories.filter((products) => products !== id));
    } else {
      setFilterCategories([...filterCategories, id]);
    }
  };
  return (
    <div className="flex flex-row">
      <div className="bg-violetahome text-white font-bold flex flex-col gap-4 h-fixed p-6 w-[200px]">
        <h1 className="text-2xl">Categories</h1>
        <div>
          {allCategories.allIds.map((id) => (
            <option
              key={id}
              value={id}
              className={`text-black cursor-pointer hover:bg-gray-100 ${filterCategories.includes(id) ? 'bg-gray-100' : ''}`}
              onClick={() => handleCategoryChange(id)}
            >
              {allCategories.byId[id].name}
            </option>
          ))}
        </div>
        <div className="w-full mb-4">
          <label htmlFor="sort">Sort by Rating:</label>
          <select
            id="sort"
            className="ml-2 px-2 py-1 border border-gray-300 rounded-md"
            value={sortRating}
            onChange={handleSortChange}
          >
            <option value="">None</option>
            <option value="ASC">Highest Rating</option>
            <option value="DESC">Lowest Rating</option>
          </select>
        </div>
        <div className="w-full mb-4">
          <label htmlFor="priceRange">Price Range:</label>
          <input
            type="range"
            id="priceRangeStart"
            min={0}
            max={499}
            value={priceRange[0]}
            onChange={(e) =>
              handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])
            }
            className="ml-2"
          />
          <input
            type="range"
            id="priceRangeEnd"
            min={500}
            max={1000}
            value={priceRange[1]}
            onChange={(e) =>
              handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])
            }
            className="ml-2"
          />
          <span>{priceRange[0]} - {priceRange[1]}</span>
        </div>
      </div>

      <div className="mt-20 flex flex-wrap justify-center">
        {products.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 p-2">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
