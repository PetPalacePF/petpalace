import { useNavigate } from "react-router-dom";
import { getProductsByNameOrBrand, } from "../../utils/getProductsByNameOrBrand";

// eslint-disable-next-line react/prop-types
export const SearchBar = ({ setProducts, search, setSearch }) => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        getProductsByNameOrBrand({ search, navigate, setProducts });
        setSearch("");
    };

    const onChange = (event) => {
        setSearch(event.target.value);
        getProductsByNameOrBrand({ search, navigate, setProducts, });
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
