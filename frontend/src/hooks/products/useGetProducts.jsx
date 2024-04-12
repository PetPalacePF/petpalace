import { useEffect, useState } from "react"

import { useLocation } from 'react-router-dom'

import axios from '../../config/axios.js'

const useGetProducts = () => {
    
    const params = useLocation()

    const [ productsData, setProductsData ] = useState({})
    const userId = JSON.parse(window.localStorage.getItem("userData"))

    useEffect(() => {
        console.log(params)
        if (userId.id) {
            axios
            .get(`/products${params.search}`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                setProductsData(data)
            })
            .catch((err) => console.log(err));
        }
    }, []);

    return {
        productsData,
        setProductsData
    }
}

export default useGetProducts