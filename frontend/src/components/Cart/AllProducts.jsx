/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

import useGetOrdersData from '../../hooks/orders/useGetOrdersData'

import axios from '../../config/axios'
import TableProducts from './TableProducts'
import { BACKEND_URL } from '../../config/config'

const AllProducts = () => {

  const [ loading, setLoading ] = useState(false)

  const {
    ordersData,
    setOrdersData
  } = useGetOrdersData()

  const handleDeleteProductCart = (id) => {
    setLoading(true)

    axios.put('/orders', {
      id: ordersData.orders[0].id,
      productsToRemove: [[id]]
    })
    .then(res => res.data)
    .then(data => {
      setOrdersData({...ordersData, orders: [ data ]})
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
  }
  
  
  const orderToSend = ordersData.orders[0]
  
  console.log("esto es orderToSend", orderToSend);

  //* Stripe implementation
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51P0rxH2NIYOIQA82hkjbhAvzJzKGiKpivFNd8bVen5bbAUpBgz7IxiJCaEVXRxmAC2iOrDIcvwFFqi9Pqfgp4EiB00aboN6QK3"
    );

    // const { products } = ordersData.orders
    // console.log("PRODUCTS ", products);
    
    const body = {
      products: orderToSend.products,
    };
    
    console.log("BODY ", body);

    const response = await axios.post(
      `${BACKEND_URL}/payment-session`,
      body
    );

    const session = await response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  };


  return (
    <>
        {
          ordersData.length === 0 ||
          ordersData[0]?.products.length === 0
          ? <p className='text-center py-12'>No hay productos en el carrito.</p>
          : <div className='flex justify-center gap-6 py-12'>
              <div className='relative'>
                <TableProducts ordersData={ordersData} handleDeleteProductCart={handleDeleteProductCart} />
                {
                  loading &&
                  <div 
                    className='absolute top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-[2px]'
                  />
                }
              </div>
              <div className='h-fit w-[350px] shadow-lg flex flex-col gap-4 p-5'>
                <div className='flex justify-between'>
                  <p>Total</p>
                  <p>
                    {
                      ordersData.orders[0]?.products.reduce((acc, product) => {
                        acc += product.price
                        return acc
                      }, 0)
                    }
                  </p>
                </div>
                <button onClick={makePayment} className='h-8 text-white uppercase font-medium w-full bg-black'>Purchase</button>
                <Link to='/shop' className='h-8 uppercase font-medium border flex justify-center items-center'>Continue shopping</Link>
              </div>
          </div> 
        }
    </>
  )
}

export default AllProducts