const AllOrders = ({ordersData, handleClickBuy}) => {

    return (
        <div className="h-full flex flex-col justify-between">
            <div>
            {
                ordersData?.Products 
                ? ordersData.Products.map(product => (
                    <div 
                        key={product.id}
                        className="flex justify-between gap-4 mb-6"
                    >
                        <div className="flex items-center gap-4">
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                                className="w-20"
                                />
                            <div className="flex flex-col text-left">
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-[14px] text-[#999]">${product.price}</p>
                            </div>
                        </div>
                        <p>x</p>
                    </div>
                ))
                : <p>No hay ordenes</p>
            }
            </div>
            <div className=" border-t-2">
                <div className="flex justify-between py-2">
                    <p className="uppercase">Subtotal:</p>
                    {
                        ordersData?.Products && 
                        ordersData.Products.reduce((acc, product) => {
                            acc += product.price
                            return acc
                        }, 0)
                    }
                </div>
                <button 
                    onClick={handleClickBuy}
                    className="bg-violetamain text-white w-full h-10 uppercase font-medium">
                    Finalizar compra
                </button>
            </div>
        </div>
    )
}

export default AllOrders