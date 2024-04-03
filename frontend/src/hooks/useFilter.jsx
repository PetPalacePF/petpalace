import { useState } from "react";

const useFilters = () => {
    const [search, setSearch] = useState("");
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterPrice, setFilterPrice] = useState([]);
    const [sortRating, setSortRating] = useState("");
    const [sortPrice, setSortPrice] = useState("");
    return {
        search,
        setSearch,
        filterCategories,
        setFilterCategories,
        filterPrice,
        setFilterPrice,
        sortRating,
        setSortRating,
        sortPrice,
        setSortPrice
    };
};

export default useFilters;
