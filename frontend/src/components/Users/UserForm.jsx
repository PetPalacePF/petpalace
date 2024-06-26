/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";

import { IoIosClose } from "react-icons/io";

export const UserForm = () => {
  const { user, isAuthenticated } = useAuth0();
  const history = useNavigate();

  const userInfo = JSON.parse(window.localStorage.getItem("userData"));

  const [userData, setUserData] = useState({
    id: userInfo.id,
    email: user?.email || userInfo?.email || "",
    name: user?.name || userInfo?.name || "",
  });

  const [editable, setEditable] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const getUserInformation = async () => {
        const response = await axios.get(`${BACKEND_URL}/users/${userInfo.id}`);
        setUserData(response.data.user);
      };
      getUserInformation();
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleKeyPress = (event) => {
    const regex = /^[0-9\b]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleModify = () => {
    if (editable === false) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  };

  const handleGoBack = () => {
    history(-1);
  };

  const handleUpdateUser = () => {
    window.localStorage.setItem("userData", JSON.stringify(userData));
    axios
      .put(`${BACKEND_URL}/users`, userData)
      .then((response) => {
        setEditable(false);
        setUpdateSuccess(true);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="w-full p-4 mt-8">
      {isAuthenticated && user && (
        <>
          <div className="flex justify-center mb-4 w-full">
            <button className="focus:outline-none">
              <img
                src={user.picture}
                alt={user.name}
                className="rounded-full h-32 w-32 object-cover cursor-pointer mb-4 mt-5"
              />
            </button>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                value={userData.email}
                className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                value={userData.name}
                onChange={handleInputChange}
                name="name"
                className={`shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  editable ? "" : "bg-gray-200"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone number:
              </label>
              <input
                value={userData.phone}
                onChange={handleInputChange}
                name="phone"
                onKeyPress={handleKeyPress}
                className={`shadow appearance-none border rounded w-1/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  editable ? "" : "bg-gray-200"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap ">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country:
                </label>
                <input
                  value={userData.country}
                  onChange={handleInputChange}
                  name="country"
                  className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    editable ? "" : "bg-gray-200"
                  }`}
                  disabled={!editable}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  State/Province:
                </label>
                <input
                  value={userData.state}
                  onChange={handleInputChange}
                  name="state"
                  className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    editable ? "" : "bg-gray-200"
                  }`}
                  disabled={!editable}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City:
                </label>
                <input
                  value={userData.city}
                  onChange={handleInputChange}
                  name="city"
                  className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    editable ? "" : "bg-gray-200"
                  }`}
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address:
                </label>
                <input
                  value={userData.street_address}
                  onChange={handleInputChange}
                  name="street_address"
                  className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    editable ? "" : "bg-gray-200"
                  }`}
                  disabled={!editable}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address Number:
                </label>
                <input
                  value={userData.street_number}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  name="street_number"
                  className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    editable ? "" : "bg-gray-200"
                  }`}
                  disabled={!editable}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ZIP Code:
                </label>
                <input
                  value={userData.ZIP_Code}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  name="ZIP_Code"
                  className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    editable ? "" : "bg-gray-200"
                  }`}
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
              <button
                onClick={handleModify}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  !editable ? "" : "bg-gray-500 pointer-events-none hover:none"
                }`}
                type="button"
              >
                Modify
              </button>
              <button
                onClick={handleUpdateUser}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  editable ? "" : "bg-gray-500 pointer-events-none hover:none"
                }`}
                type="button"
              >
                Save
              </button>
              <button
                onClick={handleGoBack}
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
              >
                Return
              </button>
            </div>
          </div>
          <div>
            {updateSuccess && (
              <div className="fixed top-0 left-0 w-full flex justify-center items-center z-50 mt-4 animate-fadeIn">
                <div className="relative bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-sm">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline">
                    {" "}
                    User information updated successfully.
                  </span>
                  <span className="absolute top-0 right-0 mt-1 mr-1">
                    <span
                      onClick={() => setUpdateSuccess(false)}
                      className="fill-current h-6 w-6 text-black-bold"
                      role="button"
                    >
                      <IoIosClose />
                      <path
                        fillRule="evenodd"
                        d="M14.354 5.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0zM5.646 5.646a.5.5 0 0 1 0-.708l8 8a.5.5 0 0 1 .708.708l-8-8a.5.5 0 0 1-.708 0z"
                      />
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
