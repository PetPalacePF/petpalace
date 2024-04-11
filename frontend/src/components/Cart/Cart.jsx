/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import useGetOrdersData from "../../hooks/orders/useGetOrdersData"

import { loadStripe } from "@stripe/stripe-js"

import { URL } from "../../config/config"

const Cart = ({ openCart }) => {

    const {
        ordersData,
        setOrdersData
    } = useGetOrdersData()

    //Stripe integration
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51P0rxH2NIYOIQA82hkjbhAvzJzKGiKpivFNd8bVen5bbAUpBgz7IxiJCaEVXRxmAC2iOrDIcvwFFqi9Pqfgp4EiB00aboN6QK3")
        
        const body = {
            products: cart //revisar cuál es el estado que tiene el carrito de compras.
        }

        const response = await fetch (`${URL}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const session = await response.json()

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })
    }

    return (
        <div className="fixed right-0 top-0 h-screen w-[350px] bg-white z-50">
            <p onClick={() => console.log(ordersData)}>CART</p>
            {/* lo de abajo creado para Stripe por Fer */}
            <button onClick={makePayment}>CHECK OUT</button>
            {/* lo de arriba creado para Stripe por Fer */}

        </div>
    )
}

export default Cart
