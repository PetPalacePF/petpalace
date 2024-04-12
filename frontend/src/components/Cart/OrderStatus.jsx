// import React from 'react'

import { useEffect, useState } from "react"
import getPaymentSessions from "../../utils/getPaymentSessions"
import { NavLink } from "react-router-dom"

export const OrderStatus = () => {

  const [stripe, setStripe] = useState([
    {
      stripe_payment_id:'',
      stripe_payment_status:''
    }
  ])

  useEffect(() => {
    getPaymentSessions(setStripe)
  }, [])

  console.log("esto es stripe ", stripe);

  const stripeSession = stripe[0]

  const { stripe_payment_id,
    stripe_payment_status } = stripeSession

  return (
    <div className="flex flex-col items-center justify-center w-full pt-8">
      <div className="w-full">
        <div className="h-24 bg-[#FAFAFA] flex justify-center items-center gap-4 w-full">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full">1</div>
            <h1 className="text-xl uppercase">Shopping Cart</h1>
          </div>
          <div className="h-[1px] w-[150px] bg-black" />
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-black text-[white] w-6 h-6 flex items-center justify-center rounded-full">2</div>
            <h1 className="text-xl uppercase">Purchase</h1>
          </div>
          <div className="h-[1px] w-[150px] bg-black" />
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-black text-[white] w-6 h-6 flex items-center justify-center rounded-full">3</div>
            <h1 className="text-xl uppercase">Order Status</h1>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-center text-3xl text-black-800 font-semibold mt-4">Your order has been processed!</h1>
          <p className="text-center text-3xl text-black-800 font-semibold mt-4">Payment ID: {stripe_payment_id} </p>
          <p className="text-center text-3xl text-black-800 font-semibold mt-4">Payment Status: {stripe_payment_status}</p>
        </div>
        <NavLink to='/shop' className='h-8 uppercase font-medium border flex justify-center items-center bg-black text-white w-full'>Continue shopping</NavLink>
      </div>
    </div>
  )
}
