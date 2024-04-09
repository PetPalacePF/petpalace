/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const UserForm = () => {
    const { user, isAuthenticated } = useAuth0();

    const userInfo = JSON.parse(window.localStorage.getItem("userData"));

    const [userData, setUserData] = useState({
        id: userInfo.id,
        email: user?.email || userInfo?.email || '',
        name: user?.name || userInfo?.name || '',
        street_address: userInfo?.street_address || '',
        country: userInfo?.country || '',
        state: userInfo?.state || '',
        city: userInfo?.city || '',
        ZIP_Code: userInfo?.ZIP_Code || '',
        phone: userInfo?.phone || '',
        street_number: userInfo?.street_number || ''
    });

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            setUserData({
                id: userInfo.id,
                email: user.email || userInfo.email || '',
                name: user.name || userInfo.name || '',
                street_address: user.address || userInfo.street_address || '',
                country: user.country || userInfo.country || '',
                state: user.state || userInfo.state || '',
                city: user.city || userInfo.city || '',
                ZIP_Code: user.zip_code || userInfo.ZIP_Code || '',
                phone: user.phone_number || userInfo.phone || '',
                street_number: user.numberAddress || userInfo.street_number || ''
            });
        }
    }, [isAuthenticated, user]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
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


    const handleUpdateUser = () => {
        console.log("este es userData ", userData);
        axios.put(`http://localhost:5000/users`, userData)
            .then(response => {
                console.log('User updated successfully:', response.data);
                setEditable(false);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <div className="w-full p-4 mt-8">
            {isAuthenticated && user && (
                <>
                    <div className="flex justify-center mb-4 w-full">
                        <button className="focus:outline-none">
                            <img src={user.picture} alt={user.name} className="rounded-full h-32 w-32 object-cover cursor-pointer mb-4 mt-5" />
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input value={userData.email} className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input value={userData.name} onChange={handleInputChange} name="name" className={`shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone number:</label>
                        <input value={userData.phone} onChange={handleInputChange} name="phone" className={`shadow appearance-none border rounded w-1/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                    </div>
                    <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap ">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
                            <input value={userData.country} onChange={handleInputChange} name="country" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">State/Province:</label>
                            <input value={userData.state} onChange={handleInputChange} name="state" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                            <input value={userData.city} onChange={handleInputChange} name="city" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                    </div>
                    <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                            <input value={userData.street_address} onChange={handleInputChange} name="street_address" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address Number:</label>
                            <input value={userData.street_number} onChange={handleInputChange} name="street_number" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">ZIP Code:</label>
                            <input value={userData.ZIP_Code} onChange={handleInputChange} name="ZIP_Code" className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-200'}`} disabled={!editable} />
                        </div>
                    </div>
                </>
            )}
            <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
                <button onClick={handleModify} className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${editable ? 'bg-gray-500 pointer-events-none hover:none' : ''}`} type="button">Modify</button>
                <button onClick={handleUpdateUser} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${editable ? '' : 'bg-gray-500 pointer-events-none hover:none'}`} type="button">Save</button>
            </div>
        </div>
    );
}
