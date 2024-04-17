import { useEffect, useState } from "react";
import { getPurchases } from "../../utils/getPurchases";

const Orders = () => {
  const [purchases, setPurchases] = useState([]);
  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + (product.price * product.cantidad);
    }, 0);
  };
  useEffect(() => {
    getPurchases(setPurchases);
  }, []);

  return (
    <div>
      {purchases.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-lg">No purchases found</p>
        </div>
      ) : (
        <ul className="divide-gray-200 mt-12  mx-auto">
          {purchases.map((purchase) => (
            <div className="flex items-center mt-10" key={purchase.id}>
              <div className="items-center w-2/4">
                <div className="text-gray-600 text-lg font-semibold">
                  <p>Payment Status: <span className="text-green-600 capitalize">{purchase.stripe_payment_status}</span></p>
                </div>
                <div className="text-gray-600 text-small font-semibold mr-4">
                  <p>Purchase ID: {purchase.stripe_payment_id}</p>
                </div>
                <div className="text-gray-600 text-sm font-semibold mr-4">
                  <p>Order ID: {purchase.Orders[0].id}</p>
                </div>
                <div className="text-gray-600 text-sm font-semibold mr-4">
                  <p>User ID: {purchase.User.id}</p>
                </div>
              </div>

              <ul className="flex overflow-hidden">
                {purchase.Orders[0].products.slice(0, 4).map((product, index) => (
                  <div className="relative" key={index}>
                    <div className='truncate'>
                      <div key={index} className="relative mr-4 ml-4">
                        <img className="h-16 object-cover rounded w-30 h-30 mr-4 " src={product.img} alt={product.name} />
                        <span className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                          X{product.cantidad}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {purchase.Orders[0].products.length > 4 && (
                  <div className="relative mt-8  mr-5">
                    <span className="text-gray-600 text-lg font-semibold">...</span>
                  </div>
                )}
              </ul>
              <p className="text-gray-600 text-lg font-semibold ml-30 mr-10">Total: ${calculateTotalPrice(purchase.Orders[0].products).toFixed(2)}</p>
            </div >
          ))
          }
        </ul >
      )}
    </div >
  )
}

export default Orders