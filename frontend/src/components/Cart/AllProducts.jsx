import { useState } from 'react'
import { Link } from 'react-router-dom'

import useGetOrdersData from '../../hooks/orders/useGetOrdersData'

import axios from '../../config/axios'
import TableProducts from './TableProducts'

const AllProducts = () => {

  const [ loading, setLoading ] = useState(false)

  const {
    ordersData,
    setOrdersData
  } = useGetOrdersData()

  const handleDeleteProductCart = (id) => {
    setLoading(true)

    const newProducts = ordersData[0].Products.filter(product => {
      return product.id !== id
    })

    axios.put('/orders', {
      id: ordersData[0].id,
      products: newProducts.map(product => product.id)
    })
    .then(res => res.data)
    .then(data => {
      setOrdersData([data])
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
  } 

  return (
    <>
        {
          ordersData.length === 0 ||
          ordersData[0].Products.length === 0
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
                <p>Acciones del carrito</p>
                <div className='flex justify-between'>
                  <p>Total</p>
                  <p>
                    {
                      ordersData[0].Products.reduce((acc, product) => {
                        acc += product.price
                        return acc
                      }, 0)
                    }
                  </p>
                </div>
                <button className='h-8 text-white uppercase font-medium w-full bg-black'>Finalizar pago</button>
                <Link to='/shop' className='h-8 uppercase font-medium border flex justify-center items-center'>Continuar comprando</Link>
              </div>
          </div> 
        }
    </>
  )
}

export default AllProducts