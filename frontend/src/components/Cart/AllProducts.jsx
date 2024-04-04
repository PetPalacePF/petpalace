import useGetOrdersData from '../../hooks/orders/useGetOrdersData'

const AllProducts = () => {

  const {
    ordersData,
    setOrdersData
  } = useGetOrdersData()

  return (
    <div>
        {
          ordersData.length === 0
          ? <p>No hay productos en el carrito.</p>
          : <table className='w-[1200px] text-left mx-auto'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody> 
                {
                  ordersData[0].Products.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>el subtotal</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        }
    </div>
  )
}

export default AllProducts