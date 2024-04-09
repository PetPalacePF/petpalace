const OrderNotExists = ({setOpenCart}) => {
  return (
        <div className="flex flex-col items-center gap-2">
            <p>Your cart is empty</p>
            <button
                onClick={() => setOpenCart(false)}
                className="bg-violetahome w-[200px] text-white font-regular uppercase"
            >Back to shop</button>
        </div>
  )
}

export default OrderNotExists