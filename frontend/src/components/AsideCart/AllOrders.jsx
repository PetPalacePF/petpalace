import { useState } from 'react'
import axios from '../../config/axios'

const AllOrders = ({ordersData, setOrdersData, handleClickBuy}) => {

    const [ loading, setLoading ] = useState(false)

    const handleDeleteProductCart = (id) => {

        setLoading(true)

        axios.put('/orders', {
          id: ordersData[0].id,
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

    return (
        <div className="h-full flex flex-col justify-between">
            <div>
            {
                ordersData[0]?.products 
                ? ordersData[0].products.map(product => (
                    <div 
                        key={product.id}
                        className='relative'
                    >
                        <div 
                            className="flex justify-between gap-4 mb-6"
                        >
                            <div className="flex items-center gap-4">
                                <img 
                                    src={product.img ? product.img : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"}
                                    className="w-20"
                                    />
                                <div className="flex flex-col text-left">
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-[14px] text-[#999]">${product.price}</p>
                                </div>
                            </div>
                            <p
                                onClick={() => handleDeleteProductCart(product.id)}
                                className='cursor-pointer'
                            >x</p>
                        </div>
                        {
                            loading &&
                            <div 
                                className='absolute top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-[2px]'
                            />
                        }
                    </div>
                ))
                : <p>There are no orders created</p>
            }
            </div>
            <div className=" border-t-2">
                <div className="flex justify-between py-2">
                    <p className="uppercase">Subtotal:</p>
                    {
                        ordersData[0]?.products && 
                        ordersData[0].products.reduce((acc, product) => {
                            acc += product.price
                            return acc
                        }, 0)
                    }
                </div>
                <button 
                    onClick={handleClickBuy}
                    className="bg-violetamain text-white w-full h-10 uppercase font-medium mb-4">
                    Purchase
                </button>
            </div>
        </div>
    )
}

export default AllOrders