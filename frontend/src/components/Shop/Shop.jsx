/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import { getAllProducts } from "../../utils/getAllProducts";
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
    getAllProducts(setProducts);
  }, [setProducts]);

  const sortProducts = (products, sortRating) => {
    if (sortRating === "highest") {
      return [...products].sort((a, b) => b.rating - a.rating);
    } else if (sortRating === "lowest") {
      return [...products].sort((a, b) => a.rating - b.rating);
    }
    return products;
  };

  const handleSortChange = (e) => {
    setSortRating(e.target.value);
  };

  const filterProducts = useMemo(() => {
    return products.filter((product) => {
      const priceInRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      // ESTO NO FUNCIONA CORRECTAMENTE RESOLVER
      // const categoryMatch = filterCategories.includes(product.id) || filterCategories.length === 0;
      // console.log(categoryMatch)
      // return priceInRange && categoryMatch;
      return priceInRange;
    });
    // }, [products, priceRange, filterCategories]);
  }, [products, priceRange]);

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
              className={`text-black hover:bg-gray-100 ${filterCategories.includes(id) ? 'bg-gray-100' : ''}`}
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
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
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
        {sortProducts(filterProducts, sortRating).map((product) => (
          <div key={product.id} className="w-full md:w-1/3 p-2">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
