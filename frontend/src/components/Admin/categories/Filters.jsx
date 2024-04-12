import { useState } from "react";
import Categories from "./Categories";
import CreateForm from "./CreateForm";
import BackgroundBlur from "../../BackgroundBlur/BackgroundBlur";
import ResetFilter from '../../../assets/resetfilter.png';
import PlusIcon from '../../../assets/plusicon.png';

const Filters = ({ allCategories, setAllCategories }) => {
  const [filters, setFilters] = useState({
    name: "",
  });
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [sortOrder, setSortOrder] = useState("ascending");

  const handleCreateCategory = () => {
    setCreatingCategory(true);
    setTimeout(() => {
      setShowCart(true);
    }, 100);
  };

  const handleCloseCategory = () => {
    setShowCart(false);
    setTimeout(() => {
      setCreatingCategory(false);
    }, 100);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

  let filteredCategories = allCategories.allIds.filter(categoryId => {
    const category = allCategories.byId[categoryId];
    if (filters.name && !category.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    return true;
  });

  filteredCategories.sort((a, b) => {
    const categoryA = allCategories.byId[a];
    const categoryB = allCategories.byId[b];
    if (sortOrder === "ascending") {
      return categoryA.name.localeCompare(categoryB.name) || categoryA.rating - categoryB.rating;
    } else {
      return categoryB.name.localeCompare(categoryA.name) || categoryB.rating - categoryA.rating;
    }
  });

  const handlerReset = () => {
    setFilters({
      name: ""
    });
    setSortOrder('ascending');
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
          className="border-2 border-violetamain rounded-lg w-[160px] h-[33px] px-2 font-semibold text-violetamain"
        />
        <select
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value)}
          className="border-2 border-violetamain rounded-lg w-[160px] h-[33px] px-2 font-semibold text-violetamain"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        <div
          className='border-2 border-violetamain rounded-lg w-[33px] h-[33px] flex items-center justify-center font-semibold text-violetamain cursor-pointer'
          onClick={handlerReset}
        >
          <img src={ResetFilter} alt="Reset Filter" />
        </div>
        <button
          onClick={handleCreateCategory}
          className='border-2 border-violetamain rounded-lg w-[33px] h-[33px] flex items-center justify-center font-semibold text-violetamain cursor-pointer'
        >
          <img src={PlusIcon} alt="Add Category" />
        </button>
      </div>

      {creatingCategory &&
        <BackgroundBlur
          showCart={showCart}
          onClick={handleCloseCategory}
        >
          {showCart &&
            <CreateForm
              creatingCategory={creatingCategory}
              setCreatingCategory={setCreatingCategory}
              setAllCategories={setAllCategories}
              allCategories={allCategories}
            />
          }
        </BackgroundBlur>
      }

      <div className="w-full">
        <Categories
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          filteredCategories={filteredCategories}
        />
      </div>
    </div>
  );
};

export default Filters;
