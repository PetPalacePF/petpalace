import { useState } from "react";
import axios from "axios";
import { Card } from "../Cards/Card";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (search.length > 3) {
                setLoading(true);
                setError(null);
                const response = await axios.get(`http://localhost:5000/products?brand_or_name=${search}`);
                navigate("/shop");
                setTimeout(() => {
                    setSearchResults(response.data);
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            setError("Error searching for products:", error);
            setLoading(false);
        }
        setSearch("");
    };

    const onChange = async (event) => {
        const newSearch = event.target.value;
        setSearch(newSearch);
        try {
            if (newSearch !== '') {
                setLoading(true);
                setError(null);
                const response = await axios.get(`http://localhost:5000/products?brand_or_name=${search}`);
                navigate("/shop");
                setTimeout(() => {
                    setSearchResults(response.data);
                    setLoading(false);
                }, 1000);
            }
            else {
                setSearchResults([]);
                setLoading(false);
            }
        } catch (error) {
            setError("Error searching for products:", error);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder="Search for products"
                value={search}
                onChange={onChange}
            />
            <button type="submit" disabled={loading}>🔍</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {Array.isArray(searchResults) && searchResults.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </ul>
        </form>
    )
}
