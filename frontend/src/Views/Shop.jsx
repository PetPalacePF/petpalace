/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { getFilteredProducts } from "../utils/getAllProducts";
import { Card } from "../components/Cards/Card";
import Paginated from "../components/Paginated/Paginated";
import getPaymentSessions from "../utils/getPaymentSessions";

export const Shop = ({ setProducts, products, allCategories, filters }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    filterCategories,
    sortRating,
    search,
    setSortRating,
    sortPrice,
    setSortPrice,
  } = filters;
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [stripe, setStripe] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/brands`)
      .then((response) => {
        const brands = response.data.brands;
        setBrands(brands);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);
  const handleBrandToggle = (brand) => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.getAll("filterBrands").includes(brand)) {
      const updatedParams = searchParams
        .getAll("filterBrands")
        .filter((b) => b !== brand);
      searchParams.delete("filterBrands");
      updatedParams.forEach((b) => searchParams.append("filterBrands", b));
    } else {
      console.log(location.search);
      searchParams.append("filterBrands", brand);
    }

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {

    getPaymentSessions(setStripe)

    getFilteredProducts(
      setProducts,
      setTotalPages,
      filterCategories,
      sortRating,
      sortPrice,
      priceRange,
      search,
      location,
      currentPage
    );
  }, [
    setProducts,
    filterCategories,
    sortRating,
    sortPrice,
    priceRange,
    search,
    location,
    currentPage
  ]);

  const handleSortRatingChange = (e) => {
    setSortRating(e.target.value);
  };

  const handleSortPriceChange = (e) => {
    setSortPrice(e.target.value);
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handleCategoryToggle = (id) => {
    if (location.search.includes(id)) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("filterCategories", id);
      const nuevaUrl = searchParams.toString();
      navigate(`?${nuevaUrl}`);
    } else {
      navigate(
        `${location.search}${
          location.search.includes("?")
            ? "&filterCategories="
            : "?filterCategories="
        }${id}`
      );
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="w-full text-black mt-14 flex justify-end items-center pr-[200px]">
      <Paginated
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
        <label htmlFor="sortRating" className="mx-2">
          Sort by Rating:
        </label>
        <select
          id="sortRating"
          className="mr-2 px-2 py-1 border border-gray-300 rounded-md text-black"
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
          className="mr-2 px-2 py-1 border border-gray-300 rounded-md text-black"
          value={sortPrice}
          onChange={handleSortPriceChange}
        >
          <option value="">None</option>
          <option value="DESC">Highest Price</option>
          <option value="ASC">Lowest Price</option>
        </select>
      </div>
      <div className="flex flex-row">
        <div className="bg-violetahome text-white flex flex-col gap-4 h-fixed p-6 w-[200px]">
          <div className="w-full mb-4 flex flex-col items-center">
            <h1 className="text-2xl text-black">Price Range:</h1>
            <div className="flex">
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  id="priceRangeMin"
                  min={0}
                  max={999}
                  value={
                    priceRange[0] === 0 && priceRange[1] === 1000
                      ? ""
                      : priceRange[0]
                  }
                  onChange={(e) =>
                    handlePriceRangeChange([
                      parseInt(e.target.value),
                      priceRange[1],
                    ])
                  }
                  className="text-black border rounded-md px-1 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min"
                  style={{ fontWeight: "normal" }}
                />
              </div>
              <div className="flex flex-col items-center ml-4">
                <input
                  type="number"
                  id="priceRangeMax"
                  min={1}
                  max={1000}
                  value={
                    priceRange[0] === 0 && priceRange[1] === 1000
                      ? ""
                      : priceRange[1]
                  }
                  onChange={(e) =>
                    handlePriceRangeChange([
                      priceRange[0],
                      parseInt(e.target.value),
                    ])
                  }
                  className="text-black border rounded-md px-1 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max"
                  style={{ fontWeight: "normal" }}
                />
              </div>
            </div>
          </div>
          <h1 className="text-2xl text-black">Categories</h1>
          <div className="flex flex-col">
            {allCategories.allIds.map((id) => (
              <p
                key={id}
                value={id}
                className={`text-black cursor-pointer hover:bg-gray-100 ${
                  location.search.includes(id) ? "bg-gray-100" : ""
                }`}
                onClick={() => handleCategoryToggle(id)}
              >
                {allCategories.byId[id].name}
              </p>
            ))}
          </div>

          <h1 className="text-2xl text-black">Brands</h1>
          <div className="flex flex-col">
            {brands.map((brand, index) => (
              <p
                key={index}
                className={`text-black cursor-pointer hover:bg-gray-100 ${
                  location.search.includes(
                    `filterBrands=${brand.replace(/ /g, "+")}`
                  )
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => handleBrandToggle(brand)}
              >
                {brand}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center">
            {products.map((product) => (
              <div key={product.id} className="mt-5 p-2">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
