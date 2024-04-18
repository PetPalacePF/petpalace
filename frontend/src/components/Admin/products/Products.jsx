
import Product from "./Product"

const AllProducts = ({ productsData, setProductsData }) => {
  return (
    <>

      <table className="w-full text-left">
        <thead className='h-16'>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Enabled</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className=''>
          {
            productsData.products?.map(product => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                rating={product.rating}
                price={product.price}
                stock={product.stock}
                enabled={product.enabled}
                img={product.img}
                setProductsData={setProductsData}
                productsData={productsData}
                productInfo={product}
              />
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default AllProducts