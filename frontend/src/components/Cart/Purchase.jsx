/* eslint-disable react/prop-types */
// import React from 'react'

const Purchase = ({ userData }) => {
    const {user}  = userData

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        user(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleModify = () => {
        if (editable === false) {
            setEditable(true);
        } else {
            setEditable(false);
        }
    }



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
        <div className="w-full p-4 mt-8">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input value={user.email} className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input value={user.name} onChange={handleInputChange} name="name" className={`shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone number:</label>
                        <input value={user.phone} onChange={handleInputChange} name="phone" className={`shadow appearance-none border rounded w-1/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                    </div>
                    <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap ">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
                            <input value={user.country} onChange={handleInputChange} name="country" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">State/Province:</label>
                            <input value={user.state} onChange={handleInputChange} name="state" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                            <input value={user.city} onChange={handleInputChange} name="city" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                    </div>
                    <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                            <input value={user.street_address} onChange={handleInputChange} name="street_address" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address Number:</label>
                            <input value={user.street_number} onChange={handleInputChange} name="street_number" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">ZIP Code:</label>
                            <input value={user.ZIP_Code} onChange={handleInputChange} name="ZIP_Code" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                    </div>
                    {updateSuccess && (
                        <div className="fixed top-0 left-0 w-full flex justify-center items-center z-50 mt-4">
                            <div className="relative bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-sm">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline"> User information updated successfully.</span>
                                <span className="absolute top-0 right-0 mt-1 mr-1">
                                    <span onClick={() => setUpdateSuccess(false)} className="fill-current h-6 w-6 text-black-bold" role="button">
                                        X
                                        <path fillRule="evenodd" d="M14.354 5.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0zM5.646 5.646a.5.5 0 0 1 0-.708l8 8a.5.5 0 0 1 .708.708l-8-8a.5.5 0 0 1-.708 0z" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
            <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
                <button onClick={handleModify} className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${editable ? 'bg-gray-500 pointer-events-none hover:none' : ''}`} type="button">Modify</button>
                <button onClick={handleUpdateUser} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-500 pointer-events-none hover:none'}`} type="button">Save</button>
            </div>
        </div>
    </div>
  )
}

export default Purchase