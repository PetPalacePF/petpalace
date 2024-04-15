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
  const [totalPages, setTotalPages] = useState(1);  const [activeFilters, setActiveFilters] = useState([]);
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
      searchParams.append("filterBrands", brand);
    }

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    getPaymentSessions(setStripe);

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
    const filters = [];

    if (location.search.includes("filterCategories")) {
      const selectedCategories = new URLSearchParams(location.search).getAll(
        "filterCategories"
      );
      // console.log("selectedCategories", selectedCategories);
      // console.log("allCategories.byId", allCategories.byId);
      selectedCategories.forEach((category) =>
        filters.push(`${allCategories?.byId[category]?.name}`)
      );
    }

    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      filters.push(`$${priceRange[0]} - $${priceRange[1]}`);
    }

    if (location.search.includes("filterBrands")) {
      const selectedBrands = new URLSearchParams(location.search).getAll(
        "filterBrands"
      );
      selectedBrands.forEach((brand) => filters.push(`${brand}`));
    }
    // console.log("activeFilters", activeFilters);
    // console.log("allCategories id name", allCategories);
    // console.log("filters", filters);
    // console.log("filterCategories", filterCategories);

    setActiveFilters(filters);
  }, [
    setProducts,
    filterCategories,
    sortRating,
    sortPrice,
    priceRange,
    search,
    location,
    currentPage
    allCategories,
  ]);
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

  const handleSortRatingChange = (e) => {
    setSortRating(e.target.value);
  };

  const handleSortPriceChange = (e) => {
    setSortPrice(e.target.value);
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handleFilterRemove = (filterToRemove, filterType) => {
    console.log("filterToRemove--------", filterToRemove);
    console.log("activeFilters", activeFilters);
    setActiveFilters((prevFilters) =>
      prevFilters.filter((filter) => filter !== filterToRemove)
    );

    const idCategoryABorrar = allCategories.allIds.find(
      (id) => allCategories.byId[id].name === filterToRemove
    );

    console.log(idCategoryABorrar);

    switch (filterType) {
      case "category":
        handleCategoryToggle(
          allCategories.allIds.find(
            (id) => allCategories.byId[id].name === filterToRemove
          )
        );
        break;
      case "priceRange":
        handlePriceRangeChange([0, 1000]);
        break;
      case "brand":
        handleBrandToggle(filterToRemove);
        break;
      default:
        break;
    }
  };

  const determineFilterType = (filterValue) => {
    const isCategory = allCategories.allIds.some((id) => {
      return allCategories.byId[id].name === filterValue;
    });
    const isBrand = brands.includes(filterValue);

    if (isCategory) {
      return "category";
    } else if (isBrand) {
      return "brand";
    } else {
      return "priceRange";
    }
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
          <div className="w-full text-black mt-14 ml-[200px] flex justify-end items-center pr-[200px]">
            {activeFilters.length > 0 && (
              <div className="flex gap-2">
                <span className="">Active Filters:</span>
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="bg-violetamain px-2 py-1 rounded-xl text-white"
                  >
                    {filter}
                    <button
                      onClick={() =>
                        handleFilterRemove(filter, determineFilterType(filter))
                      }
                      className="ml-1"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || isNaN(parseInt(value))) {
                      handlePriceRangeChange([0, priceRange[1]]);
                    } else {
                      handlePriceRangeChange([parseInt(value), priceRange[1]]);
                    }
                  }}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || isNaN(parseInt(value))) {
                      handlePriceRangeChange([priceRange[0], 1000]);
                    } else {
                      handlePriceRangeChange([priceRange[0], parseInt(value)]);
                    }
                  }}
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
