import { useNavigate } from "react-router-dom";
import { getFilteredProducts } from "../../utils/getAllProducts";

// eslint-disable-next-line react/prop-types
export const SearchBar = ({ setProducts, search, setSearch }) => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        getFilteredProducts({ search, setProducts })
        setSearch("");
    };

    const onChange = (event) => {
        setSearch(event.target.value);
        getFilteredProducts({ search, setProducts })
        navigate('/shop')
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Search for products"
                    value={search}
                    onChange={onChange}
                />
                <button type="submit">🔍</button>
            </form>
        </div>
    )
}
