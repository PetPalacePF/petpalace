const TableProducts = ({ordersData, handleDeleteProductCart}) => {
  return (
    <table className='w-[800px] text-left'>
        <thead>
        <tr className='h-16 uppercase'>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
        </tr>
        </thead>
        <tbody> 
        {
            ordersData[0].Products.map(product => (
            <tr key={product.id} className='border-t'>
                <td className='flex items-center gap-1 h-22'>
                <img 
                    src={product.img}
                    className='w-14'
                />
                <div>
                    <p>{product.name}</p>
                    <button onClick={() => handleDeleteProductCart(product.id)} className='text-sm underline font-medium cursor-pointer'>Eliminar</button>
                </div>
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
            </tr>
            ))
        }
        </tbody>
    </table>
  )
}

export default TableProducts