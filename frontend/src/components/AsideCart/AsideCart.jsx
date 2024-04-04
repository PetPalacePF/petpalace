import { useState, useEffect } from "react"
import useGetOrdersData from "../../hooks/orders/useGetOrdersData"

import OrderNotExists from "./OrderNotExists"
import AllOrders from "./AllOrders"

import CartIcon from '../../assets/cart.png'

const AsideCart = ({ showCart, setShowCart, handleClickBuy, handleClickClose }) => {

    const {
        ordersData,
        setOrdersData
    } = useGetOrdersData()

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCart(true)
        }, 50)

        document.body.style.overflow = "hidden";
        document.body.style.marginRight = "16px";

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = "auto";
            document.body.style.marginRight = "0";
        }
    }, [])

    return (
        <div className={`fixed ${!showCart ? '-right-[350px]' : 'right-0'} top-0 h-screen w-[350px] bg-white z-50 pt-10 px-6 text-center flex flex-col gap-12 transition-all overflow-y-scroll`}>
            <div className="flex flex-col items-center gap-1">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute top-0 right-0 w-4 h-4 bg-violetahome rounded-full flex items-center justify-center">
                        <p>{ordersData.length > 0 ? ordersData[0].Products.length : '0' }</p>
                    </div>
                    <img 
                        src={CartIcon}
                        className="w-6"
                    />
                </div>
                <p className="uppercase" onClick={() => console.log(ordersData)}>Carrito de compras</p>
            </div>
            {   
                ordersData.length === 0 ||
                ordersData[0].Products.length === 0 
                ? <OrderNotExists 
                    setOpenCart={handleClickClose}
                />
                : <AllOrders handleClickBuy={handleClickBuy} ordersData={ordersData[0]} setOrdersData={setOrdersData} />
            }
        </div>
    )
}

export default AsideCart