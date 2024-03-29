import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByNameOrBrand, getProductsByNameOrBrandOnchange } from "../../utils/getProductsByNameOrBrand";

export const SearchBar = ({ setProducts }) => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        getProductsByNameOrBrand({ search, setLoading, setError, navigate, setProducts });
        setSearch("");
    };

    const onChange = (event) => {
        setSearch(event.target.value);
        getProductsByNameOrBrandOnchange({ setLoading, setError, navigate, setProducts, searchResults, search });
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
                <button type="submit" disabled={loading}>🔍</button>

            </form>
            {/* <SearchResults searchResults={searchResults} loading={loading} error={error} /> */}
        </div>
    )
}
