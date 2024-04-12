/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import axios from '../../config/axios'
import { useLocation } from 'react-router-dom'

import useGetOrdersData from '../../hooks/orders/useGetOrdersData'

import TableProducts from './TableProducts'
import { BACKEND_URL } from '../../config/config'


const AllProducts = ({ selectedLink, handleLinkClick, location, ordersData }) => {

  // console.log("ESTO ES LOCATION", location);

  // // Función para determinar el texto del botón
  // const getButtonText = () => {
  //   // Si estamos en la ruta /cart, el texto será 'Purchase'
  //   if (location.pathname === '/cart') {
  //     return 'Purchase';
  //   }
  //   // Si estamos en la ruta /purchase, el texto será 'Buy Now'
  //   else if (location.pathname === '/purchase') {
  //     return 'Buy Now';
  //   }
  //   // Para cualquier otra ruta, el texto será 'Purchase'
  //   else {
  //     return 'Purchase';
  //   }
  // };

  // // Función para manejar el click del botón
  // const handleClick = () => {
  //   // Si estamos en la ruta /cart, redirigir a /purchase
  //   if (location.pathname === '/cart') {
  //     history.push('/purchase');
  //   } else if (location.pathname === '/purchase') {
  //     history.push('/cart');
  //   }
    // Aquí puedes agregar lógica para redirigir a /purchase si es necesario
    // Por ejemplo, si el usuario hace clic en 'Purchase' mientras está en /cart
    // podrías redirigirlo a /purchase usando history.push('/purchase')
    // o cualquier método que estés usando para la navegación en tu aplicación
  // };

  // const [loading, setLoading] = useState(false)

  // const {
  //   ordersData,
  //   setOrdersData
  // } = useGetOrdersData()

  // console.log("ESTO ES ORDERS DATA ", ordersData);

  const handleDeleteProductCart = (id) => {
    setLoading(true)

    axios.put('/orders', {
      id: ordersData.orders[0].id,
      productsToRemove: [[id]]
    })
      .then(res => res.data)
      .then(data => {
        setOrdersData({ ...ordersData, orders: [data] })
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

    const body = {
      products: orderToSend.products,
    };

    console.log("ALL PRODUCTS BODY ", body);

    const response = await axios.post(
      `${BACKEND_URL}/payment-session`,
      body
    );

    const session = await response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
    console.log("RESULT ", result);
  }

  return (
    <>
      {
        ordersData.length === 0 ||
          ordersData[0]?.products.length === 0
          ? <p className='text-center py-12'>Your cart is empty.</p>
          : <div className='flex justify-center gap-6 py-12'>
            {location.pathname === '/cart' && (
              <div className='relative'>
                <TableProducts ordersData={ordersData} handleDeleteProductCart={handleDeleteProductCart} />
                {
                  loading &&
                  <div
                    className='absolute top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-[2px]'
                  />
                }
              </div>
            )}
            <div className='h-fit w-[350px] shadow-lg flex flex-col gap-4 p-5'>
              <div>
                {location.pathname === '/cart' ? (
                  <div>
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
                    <NavLink to="/cart/purchase"
                      className='h-8 uppercase font-medium border flex justify-center items-center bg-black text-white'
                      onClick={() => handleLinkClick('/cart/purchase')}>
                      Purchase
                    </NavLink>
                  </div>
                ) : (
                  <div className='relative'>
                    <div className='flex flex-col gap-4'>
                      <table className='w-[500px] text-left'>
                        <thead>
                          <tr className='h-16 uppercase'>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            ordersData.orders[0]?.products.map(product => (
                              <tr key={product.id} className='border-t'>
                                <td className='flex items-center gap-1 h-22'>
                                  <img
                                    src={product.img}
                                    className='w-14'
                                  />
                                  <div>
                                    <p className='text-l font-medium'>{product.name}</p>
                                    <p className='text-sm font-medium'>{product.brand}</p>
                                  </div>
                                </td>
                                <td>${product.price}</td>
                                <td>
                                  <p className="text-[16px] inline">
                                    {product.cantidad}
                                  </p>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      <div className='flex justify-between'>
                        <h1 className='font-medium text-lg'>Total</h1>
                        <p className='font-medium text-lg'>
                          {
                            ordersData.orders[0]?.products.reduce((acc, product) => {
                              acc += product.price
                              return acc
                            }, 0)
                          }
                        </p>
                      </div>
                    </div>
                    <NavLink to="/cart"
                      className='h-8 uppercase font-medium border flex justify-center items-center bg-black text-white'
                      onClick={() => handleLinkClick('/cart')}>
                      Buy Now
                    </NavLink>
                  </div>
                )}
                <NavLink to='/shop' className='h-8 uppercase font-medium border flex justify-center items-center mt-2'>Continue shopping</NavLink>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default AllProducts