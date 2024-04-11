/* eslint-disable no-unused-vars */
import { Routes, Route, useLocation } from "react-router-dom"
import axios from "axios";

import AllProducts from "../../components/Cart/AllProducts"
import Purchase from "../../components/Cart/Purchase"
import { OrderStatus } from "../../components/Cart/OrderStatus"
import { useEffect, useState } from "react"


const Cart = () => {

    const { id } = JSON.parse(window.localStorage.getItem("userData"));

    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        if (id) {
            const getUserInformation = async () => {
                const response = await axios(`http://localhost:5000/users/${id}`);
                console.log("esto es response ", response.data);
                setUserData(response.data);
            };
    
            getUserInformation();
        }
    }, [id]);

    console.log("esto es userData ", userData);

    const nameComplete = userData.user

    const name = nameComplete.name.split(" ")[0];
    console.log("esto es name ", name);

    const location = useLocation()

    const [selectedLink, setSelectedLink] = useState('/cart');
    const handleLinkClick = (link) => {
        setSelectedLink(link);
    }
    return (
        <div>
            <span>Hi {name}! Please check your cart before proceeding...</span>
            {location.pathname === '/cart' && (
                <div className="pt-[35px]">
                    <div className="h-24 bg-[#FAFAFA] flex justify-center items-center gap-4">
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
                        <div
                            className="h-[1px] w-[150px] bg-[#ccc]"
                        />
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-[#ccc] text-[white] w-6 h-6 flex items-center justify-center rounded-full">3</div>
                            <h1 className="text-xl uppercase text-[#ccc]">Order Status</h1>
                        </div>
                    </div>
                </div>
            )}

            {location.pathname === '/cart/purchase' && (
                <div>
                    <Purchase userData={userData}/>
                </div>
            )}

            {location.pathname === '/cart/orderStatus' && (
                <div>
                    <OrderStatus />
                </div>
            )}

            <div>
                <AllProducts selectedLink={selectedLink} handleLinkClick={handleLinkClick} location={location}/>
            </div>
            <div>
                {/* <Routes>
                    <Route path="/purchase" element={<Purchase />}></Route>
                    <Route path="/orderStatus" element={<OrderStatus />}></Route>
                </Routes> */}
            </div>
        </div>
    )
}

export default Cart