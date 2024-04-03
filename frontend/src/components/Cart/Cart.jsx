import { useState, useEffect } from "react"
import useGetOrdersData from "../../hooks/orders/useGetOrdersData"

import OrderNotExists from "./OrderNotExists"
import AllOrders from "./AllOrders"

import CartIcon from '../../assets/cart.png'

const Cart = ({ openCart }) => {

    const {
        ordersData,
        setOrdersData
    } = useGetOrdersData()

    return (
        <div className={`fixed ${!openCart ? 'right-[350px]' : 'right-0'} top-0 h-screen w-[350px] bg-white z-50 py-10 px-6 text-center flex flex-col gap-12`}>
            <div className="flex flex-col items-center gap-1">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute top-0 right-0 w-4 h-4 bg-violetahome rounded-full flex items-center justify-center">
                        <p>{ordersData.products ? ordersData.products.length : '0' }</p>
                    </div>
                    <img 
                        src={CartIcon}
                        className="w-6"
                    />
                </div>
                <p className="uppercase" onClick={() => console.log(ordersData)}>Carrito de compras</p>
            </div>
            {   
                ordersData.length < 0  
                ? <OrderNotExists />
                : <AllOrders ordersData={ordersData[0]} />
            }
        </div>
    )
}

export default Cart