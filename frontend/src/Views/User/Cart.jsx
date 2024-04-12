/* eslint-disable no-unused-vars */
import { Routes, Route, useLocation } from "react-router-dom"
import axios from "axios";

import AllProducts from "../../components/Cart/AllProducts"
import Purchase from "../../components/Cart/Purchase"
import { OrderStatus } from "../../components/Cart/OrderStatus"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config/config";


const Cart = () => {

    const { id } = JSON.parse(window.localStorage.getItem("userData"));

    console.log("esto es id ", id);

    const [userInfo, setUserInfo] = useState({
        user: {
            id: null,
            name: "",
            email: "",
            orders: [],
            purchases: [],
            country: null,
            state: null,
            city: null,
            street_address: null,
            ZIP_Code: null,
            phone: null
        }
    });

    useEffect(() => {
        if (id) {
            const getUserInformation = async () => {
                try {
                    const response = await axios.get(`${BACKEND_URL}/users/${id}`);
                    console.log("esto es response ", response.data);
                    setUserInfo(response.data);
                } catch (error) {
                    console.error("Error al obtener información del usuario:", error);
                }
            };

            getUserInformation();
        }
    }, [id]);


    console.log("esto es userInfo ", userInfo);

    const nameComplete = userInfo.user

    const name = nameComplete.name.split(" ")[0];
    console.log("esto es name ", name);

    const location = useLocation()

    const [selectedLink, setSelectedLink] = useState('/cart');
    const handleLinkClick = (link) => {
        setSelectedLink(link);
    }

    const { user } = userInfo

    console.log("esto es user ", user);

    const isComplete = () => {
        const requiredFields = ["name", "email", "ZIP_Code", "phone", "street_address", "city", "state", "country"];
        return requiredFields.every(field => user[field]);
    };

    const result = isComplete() ? true : false;

    console.log("isComplete", result);

    return (
        <div className="flex flex-col items-center justify-center">
            {location.pathname === '/cart' && (
                <div className="pt-[35px]">
                    <div className="bg-[#FAFAFA] h-24 flex justify-center items-center gap-4">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full">1</div>
                            <h1 className="text-xl uppercase">Shopping Cart</h1>
                        </div>
                        <div
                            className="h-[1px] w-[150px] bg-[#ccc]"
                        />
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-[#ccc] text-[white] w-6 h-6 flex items-center justify-center rounded-full">2</div>
                            <h1 className="text-xl uppercase text-[#ccc]">Purchase</h1>
                        </div>
                        <div className="h-[1px] w-[150px] bg-[#ccc]" />
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-[#ccc] text-[white] w-6 h-6 flex items-center justify-center rounded-full">3</div>
                            <h1 className="text-xl uppercase text-[#ccc]">Order Status</h1>
                        </div>
                    </div>
                    <h1 className="text-center text-3xl text-black-800 font-semibold mt-4">Hi {name}! Please check your cart before proceeding...</h1>
                </div>
            )}
            {location.pathname === '/cart/purchase' && (
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
                        <div className="h-[1px] w-[150px] bg-[#ccc]"/>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-[#ccc] text-[white] w-6 h-6 flex items-center justify-center rounded-full">3</div>
                            <h1 className="text-xl uppercase text-[#ccc]">Order Status</h1>
                        </div>
                        <div>
                            {!result ? (
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <h1 className="text-2xl font-bold">Looks like you have not completed your profile</h1>
                                    <span className="text-2xl font-bold">Please check your information and try again!</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <h1 className="text-2xl font-bold">Almost done!</h1>
                                    <span className="text-2xl font-bold">Please check your information before buying</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <Purchase userInfo={userInfo} result={result} />
                    </div>
                </div>
            )}
            {location.pathname === '/cart/orderStatus' && (
                <div>
                    <OrderStatus />
                </div>
            )}
            <div>
                <AllProducts selectedLink={selectedLink} handleLinkClick={handleLinkClick} location={location} />
            </div>
        </div>
    )
}

export default Cart