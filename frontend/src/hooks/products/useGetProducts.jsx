// En el hook useGetProducts
import { useEffect, useState } from "react";
import axios from '../../config/axios.js'

const useGetProducts = (sortRating, sortPrice, search) => {
    const [productsData, setProductsData] = useState({});

    useEffect(() => {
        let url = `/products`;

        if (sortRating || sortPrice || search) {
            url += "?";

            if (sortRating) {
                url += `sortRating=${sortRating}&`;
            }
            if (sortPrice) {
                url += `sortPrice=${sortPrice}&`;
            }
            if (search) {
                url += `brand_or_name=${search}&`;
            }

            url = url.slice(0, -1); // Remove trailing "&" or "?"
        }

        axios
            .get(url)
            .then((res) => res.data)
            .then((data) => {
                setProductsData(data)
            })
            .catch((err) => console.log(err));
    }, [sortRating, sortPrice, search]);

    return {
        productsData,
        setProductsData
    }
}

export default useGetProducts;
