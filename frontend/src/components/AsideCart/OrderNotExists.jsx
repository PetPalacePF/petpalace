const OrderNotExists = ({setOpenCart}) => {
  return (
        <div className="flex flex-col items-center gap-2">
            <p>No hay productos en el sitio</p>
            <button
                onClick={() => setOpenCart(false)}
                className="bg-violetahome w-[200px] text-white font-regular uppercase"
            >Volver a la tienda</button>
        </div>
  )
}

export default OrderNotExists