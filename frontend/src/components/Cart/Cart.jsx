import { useState, useEffect } from "react"
import useGetOrdersData from "../../hooks/orders/useGetOrdersData"

const Cart = ({ openCart }) => {

    const {
        ordersData,
        setOrdersData
    } = useGetOrdersData()

    return (
        <div className="fixed right-0 top-0 h-screen w-[350px] bg-white z-50">
            <p onClick={() => console.log(ordersData)}>CART</p>
        </div>
    )
}

export default Cart