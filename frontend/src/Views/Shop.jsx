import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

import { getFilteredProducts } from "../utils/getAllProducts";
import { Card } from "../components/Cards/Card";
import Paginated from "../components/Paginated/Paginated";
import getPaymentSessions from "../utils/getPaymentSessions";

import { Footer } from "../components/Footer/Footer";

import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { HiChevronDoubleDown } from "react-icons/hi";
import { HiChevronDoubleUp } from "react-icons/hi";

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
  const [activeFilters, setActiveFilters] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [visibleBrands, setVisibleBrands] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productAdded, setProductAdded] = useState(null);

  useEffect(() => {
    window.localStorage.setItem("buyNow", JSON.stringify(false));
    axios
      .get(`${BACKEND_URL}/brands`)
      .then((response) => {
        const brands = response.data.brands;
        setBrands(brands);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

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
      currentPage,
    );
    const filters = [];

    if (location.search.includes("filterCategories")) {
      const selectedCategories = new URLSearchParams(location.search).getAll(
        "filterCategories"
      );
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

    setActiveFilters(filters);
  }, [
    setProducts,
    filterCategories,
    sortRating,
    sortPrice,
    priceRange,
    search,
    location,
    allCategories,
    currentPage,
    brands,
  ]);
  const handleCategoryToggle = (id) => {
    if (location.search.includes(id)) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("filterCategories", id);
      const nuevaUrl = searchParams.toString();
      navigate(`?${nuevaUrl}`);
    } else {
      navigate(
        `${location.search}${location.search.includes("?")
          ? "&filterCategories="
          : "?filterCategories="
        }${id}`
      );
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

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

  const showMoreBrands = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 10);
  };

  const showLessBrands = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands - 10 || 10);
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
    // console.log("filterToRemove--------", filterToRemove);
    // console.log("activeFilters", activeFilters);
    setActiveFilters((prevFilters) =>
      prevFilters.filter((filter) => filter !== filterToRemove)
    );

    const idCategoryABorrar = allCategories.allIds.find(
      (id) => allCategories.byId[id].name === filterToRemove
    );

    // console.log(idCategoryABorrar);

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

  const handleAddToCart = (productName) => {
    setProductAdded(productName);
  };

  {
    console.log("Products length:", products.length);
  }

  return (
    <div>
      <div className="flex items-center justify-between px-[200px] mt-14">
        <div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="bg-violetahome px-2 py-1 rounded-xl flex items-center"
                  >
                    {filter}
                    <button
                      onClick={() =>
                        handleFilterRemove(filter, determineFilterType(filter))
                      }
                      className="ml-1"
                    >
                      <IoIosClose />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <div className="mx-2">
            <label htmlFor="sortRating" className="block text-center">
              Sort by Rating:
            </label>
            <div className="relative">
              <select
                id="sortRating"
                className="border border-gray-300 rounded-full h-10 pl-5 pr-10 pr-8 hover:border-gray-400 focus:outline-none appearance-none"
                value={sortRating}
                onChange={handleSortRatingChange}
                onClick={() => setIsRatingOpen(!isRatingOpen)}
                onBlur={() => setIsRatingOpen(false)}
              >
                <option value="">None</option>
                <option value="DESC">Highest Rating</option>
                <option value="ASC">Lowest Rating</option>
              </select>
              {isRatingOpen ? (
                <FaChevronUp className="w-4 h-4 absolute top-0 right-0 mt-3 mr-3 pointer-events-none" />
              ) : (
                <FaChevronDown className="w-4 h-4 absolute top-0 right-0 mt-3 mr-3 pointer-events-none" />
              )}
            </div>
          </div>

          <div className="mx-2">
            <label htmlFor="sortPrice" className="block text-center">
              Sort by Price:
            </label>
            <div className="relative">
              <select
                id="sortPrice"
                className="border border-gray-300 rounded-full h-10 pl-5 pr-10 hover:border-gray-400 focus:outline-none appearance-none"
                value={sortPrice}
                onChange={handleSortPriceChange}
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                onBlur={() => setIsPriceOpen(false)}
              >
                <option value="">None</option>
                <option value="DESC">Highest Price</option>
                <option value="ASC">Lowest Price</option>
              </select>
              {isPriceOpen ? (
                <FaChevronUp className="w-4 h-4 absolute top-0 right-0 mt-3 mr-3 pointer-events-none" />
              ) : (
                <FaChevronDown className="w-4 h-4 absolute top-0 right-0 mt-3 mr-3 pointer-events-none" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="bg-violetahome text-white flex flex-col gap-4 h-fixed p-6 w-[200px]">
          <div className="w-full mb-4 flex flex-col items-center">
            <h1 className="text-2xl text-black mb-2">Price Range:</h1>
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
                className={`text-black cursor-pointer transition-colors ${location.search.includes(id) ? "bg-gray-100" : ""
                  } hover:text-blue-500`}
                onClick={() => handleCategoryToggle(id)}
              >
                {allCategories.byId[id].name}
              </p>
            ))}
          </div>

          <h1 className="text-2xl text-black">Brands</h1>
          <div className="flex flex-col">
            {brands.slice(0, visibleBrands).map((brand, index) => (
              <p
                key={index}
                value={brand}
                className={`text-black cursor-pointer transition-colors hover:text-blue-500 ${location.search.includes(
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
            <div className="flex justify-end w-full">
              {visibleBrands > 10 && (
                <button
                  className="bg-gray-100 text-black mx-[4px] rounded "
                  onClick={showLessBrands}
                >
                  <HiChevronDoubleUp />
                </button>
              )}

              {visibleBrands < brands.length && (
                <button
                  className="bg-gray-100 text-black mx-[4px] rounded "
                  onClick={showMoreBrands}
                >
                  <HiChevronDoubleDown />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-6 flex-grow">
          {products.length === 0 ? (
            <div className="text-center mt-20 mb-14">
              <p className="text-[70px] font-bold text-gray-800">Oops!</p>
              <p className="text-lg text-gray-800">
                There are no products that match your filter parameters.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center mb-6">
                {products.map((product) => (
                  <div key={product.id} className="mt-5 p-2">
                    <Card product={product} onAddToCart={handleAddToCart} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Paginated
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  className="my-6"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
