// import React from 'react'

const Purchase = () => {
  return (
    <div className="pt-[35px]">
        <div className="h-24 bg-[#FAFAFA] flex justify-center items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full">1</div>
                <h1 className="text-xl uppercase">Shopping Cart</h1>
            </div>
            <div 
                className="h-[1px] w-[150px] bg-black"
            />
            <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-black text-[white] w-6 h-6 flex items-center justify-center rounded-full">2</div>
                <h1 className="text-xl uppercase">Purchase</h1>
            </div>
            <div 
                className="h-[1px] w-[150px] bg-[#ccc]"
            />
            <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-[#ccc] text-[white] w-6 h-6 flex items-center justify-center rounded-full">3</div>
                <h1 className="text-xl uppercase text-[#ccc]">Order Status</h1>
            </div>
        </div>
    </div>
  )
}

export default Purchase