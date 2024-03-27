import { useState } from "react";
import axios from "axios";

export const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/products?q=${search}`);
            setSearchResults(response.data);
        } catch (error) {
            setError("Error searching for products:", error);
        } finally {
            setLoading(false);
        }
        setSearch('');
    };

    const onChange = async (event) => {
        const newSearch = event.target.value;
        setSearch(newSearch);

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/products?q=${newSearch}`);
            setSearchResults(response.data);
        } catch (error) {
            setError("Error searching for products:", error);
        } finally {
            setLoading(false);
        }
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
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {Array.isArray(searchResults) && searchResults.map((product, index) => (
                    <li key={index}>{product.name}</li>
                ))}
            </ul>
        </div>
    )
}
