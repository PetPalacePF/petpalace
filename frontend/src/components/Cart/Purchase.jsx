/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

const Purchase = ({ userInfo, result }) => {
    const { user } = userInfo

    return (
        <div>
            <div className="w-full p-4 mt-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input value={user.email} className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input value={user.name} name="name" className={`shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} disabled />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone number:</label>
                    <input value={user.phone} name="phone" className={`shadow appearance-none border rounded w-1/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} disabled />
                </div>
                <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap ">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
                        <input value={user.country} name="country" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} disabled />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">State/Province:</label>
                        <input value={user.state} name="state" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} disabled />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                        <input value={user.city} name="city" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} disabled />
                    </div>
                </div>
                <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                        <input value={user.street_address} name="street_address" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} disabled />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Address Number:</label>
                        <input value={user.street_number} name="street_number" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} disabled />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">ZIP Code:</label>
                        <input value={user.ZIP_Code} name="ZIP_Code" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} disabled />
                    </div>
                </div>
                <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
                    {!result ? (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <NavLink to="/profile/personalInfo" className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button">Add personal information</NavLink>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <NavLink to="/profile/personalInfo" className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button">Edit Personal Information</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Purchase