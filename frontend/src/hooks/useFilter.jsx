import { useState } from "react";

const useFilters = () => {
    const [search, setSearch] = useState("");
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterPrice, setFilterPrice] = useState([]);
    const [sortRating, setSortRating] = useState("");

    return {
        search,
        setSearch,
        filterCategories,
        setFilterCategories,
        filterPrice,
        setFilterPrice,
        sortRating,
        setSortRating
    };
};

export default useFilters;
