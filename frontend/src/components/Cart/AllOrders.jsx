const AllOrders = ({ordersData}) => {
    return (
        <div>
            {
                ordersData?.products && ordersData.products.map(product => (
                    <p
                        key={product}
                    >{product}</p>
                ))
            }
        </div>
    )
}

export default AllOrders