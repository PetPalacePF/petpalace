import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
export const UserForm = () => {
    const { user, isAuthenticated } = useAuth0();
    const [emailInput, setEmailInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [countryInput, setCountryInput] = useState('');
    const [provinceInput, setProvinceInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [zipCodeInput, setzipCodeInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [numberAddress, setNumberAddress] = useState('');

    const handleEmailInputChange = (event) => {
        setEmailInput(event.target.value);
    };
    const handleNameInputChange = (event) => {
        setNameInput(event.target.value);
    };
    const handleAdressInputChange = (event) => {
        setAddressInput(event.target.value);
    };
    const handleCountryInputChange = (event) => {
        setCountryInput(event.target.value);
    };
    const handleProvinceInputChange = (event) => {
        setProvinceInput(event.target.value);
    };
    const handleCityInputChange = (event) => {
        setCityInput(event.target.value);
    };
    const handleNumberAddressInputChange = (event) => {
        setNumberAddress(event.target.value);
    };
    const handlezipCodeInputChange = (event) => {
        setzipCodeInput(event.target.value);
    };
    const handlePhoneInputChange = (event) => {
        setPhoneInput(event.target.value);
    };
    const handleSave = () => {
        // Aquí puedes agregar lógica para guardar los datos del perfil
        console.log('Correo electrónico guardado:', emailInput);
        console.log('Nombre guardado:', nameInput);
        console.log('Dirección guardada:', addressInput);
        console.log('País guardado:', countryInput);
        console.log('Provincia guardada:', provinceInput);
        console.log('Ciudad guardada:', cityInput);
        console.log('Código postal guardado:', zipCodeInput);
        console.log('Número de teléfono guardado:', phoneInput);
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
                    {!user.email && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <input value={emailInput} onChange={handleEmailInputChange} className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    )}
                    {user.email && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <input value={user.email} className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                        </div>
                    )}
                    {!user.name && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <input value={nameInput} onChange={handleNameInputChange} className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    )}
                    {user.name && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <input value={user.name} className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                        </div>
                    )}
                    {!user.phone_number && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone number:</label>
                            <input value={phoneInput} onChange={handlePhoneInputChange} className="shadow appearance-none border rounded w-1/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    )}
                    {user.phone_number && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone number:</label>
                            <input value={user.phone_number} className="shadow appearance-none border rounded w-1/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                        </div>
                    )}
                    <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap ">

                        {!user.country && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
                                <input value={countryInput} onChange={handleCountryInputChange} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        )}
                        {user.country && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
                                <input value={user.country} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                            </div>
                        )}
                        {!user.province && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Province:</label>
                                <input value={provinceInput} onChange={handleProvinceInputChange} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        )}
                        {user.province && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Province:</label>
                                <input value={user.province} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                            </div>
                        )}
                        {!user.city && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                                <input value={cityInput} onChange={handleCityInputChange} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        )}
                        {user.city && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                                <input value={user.city} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">

                        {!user.address && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                                <input value={addressInput} onChange={handleAdressInputChange} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        )}
                        {user.address && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                                <input value={user.address} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                            </div>
                        )}
                        {!user.numberAddress && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Address Number:</label>
                                <input value={numberAddress} onChange={handleNumberAddressInputChange} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        )}
                        {user.numberAddress && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Address Number:</label>
                                <input value={user.numberAddress} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                            </div>
                        )}
                        {!user.zip_code && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">ZIP Code:</label>
                                <input value={zipCodeInput} onChange={handlezipCodeInputChange} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        )}
                        {user.zip_code && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">ZIP Code:</label>
                                <input value={user.zip_code} className="shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                            </div>
                        )}
                    </div>

                </>
            )}
            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Save</button>
        </div >
    )
}
