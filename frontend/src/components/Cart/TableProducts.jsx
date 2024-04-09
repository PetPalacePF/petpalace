const TableProducts = ({ordersData, handleDeleteProductCart}) => {

    console.log(ordersData)

  return (
    <table className='w-[800px] text-left'>
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
                    <p>{product.name}</p>
                    <button onClick={() => handleDeleteProductCart(product.id)} className='text-sm underline font-medium cursor-pointer'>Delete</button>
                </div>
                </td>
                <td>${product.price}</td>
                <td>
                    <div className="inline mr-3 w-4 h-4 text-xl">
                        <button className="">-</button>
                    </div>
                    <p className="text-[16px] inline">
                        {product.cantidad}
                    </p>
                    <div className="inline ml-3 w-4 h-4 text-xl">
                        <button className="">+</button>
                    </div>
                </td>
            </tr>
            ))
        }
        </tbody>
    </table>
  )
}

export default TableProducts