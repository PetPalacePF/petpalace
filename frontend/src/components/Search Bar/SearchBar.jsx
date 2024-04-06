import { useNavigate } from "react-router-dom";
import { getFilteredProducts } from "../../utils/getAllProducts";
import searchIcon from "../../assets/searchIcon-24x24.png";

// eslint-disable-next-line react/prop-types
export const SearchBar = ({ filters, setProducts }) => {
  const navigate = useNavigate();
  const { search, setSearch } = filters;
  const handleSubmit = (event) => {
    event.preventDefault();
    getFilteredProducts({ search, setProducts });
    setSearch("");
  };

  const onChange = (event) => {
    setSearch(event.target.value);
    getFilteredProducts({ search, setProducts });
    navigate("/shop");
    console.log(setProducts)
  };
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="search"
          placeholder="Search for products"
          value={search}
          onChange={onChange}
          className="py-2 px-4 border border-gray-300 rounded-l focus:outline-none"
        />
        <button type="submit" className="bg-violetahome py-2 px-4 rounded-r">
          <img src={searchIcon} alt="Search Icon" className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};
