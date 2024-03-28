import { useState } from "react";

export const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const onChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    return (
        <form
        onSubmit={handleSubmit}
        >
            <input
                type="search"
                placeholder="Search for products"
                value={searchTerm}
                onChange={onChange}
                />
            <button
            type="submit"
            >🔍</button>
        </form>
    )
}
