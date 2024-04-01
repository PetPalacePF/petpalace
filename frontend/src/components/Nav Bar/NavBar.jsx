/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export const NavBar = ({ allCategories }) => {

    const [ selectingCategory, setSelectingCategory ] = useState(false)
    const [ selectedCategory, setSelectedCategory ] = useState('');


    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className="absolute top-[55px] left-0 right-0 flex justify-center z-10">
            <nav className="bg-white p-4 border shadow-lg rounded-lg flex gap-4">
                <NavLink
                    to="/"
                    className="text-black hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    HOME
                </NavLink>
                {/* <select

                    className="text-black hover:text-gray-300 bg-white rounded-lg px-3 py-1 focus:outline-none"
                    value={selectedCategory || ''}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    <option className="text-gray-500">CATEGORIES</option>
                    {allCategories.allIds.map((categoryId) => (
                        <option
                            key={categoryId}
                            value={categoryId}
                            className="text-black hover:bg-gray-100"
                        >
                            {allCategories.byId[categoryId].name}
                        </option>
                    ))}
                </select> */}
                <div className="relative">
                    <div onClick={() => setSelectingCategory(!selectingCategory)}>
                        <p className="uppercase cursor-pointer">Categories</p>
                    </div>
                    {
                        selectingCategory &&
                        <div className="absolute left-1/2 -translate-x-1/2 bg-white w-[500px] h-[150px] p-5 flex flex-col flex-wrap">
                        {
                            allCategories.allIds.map((categoryId) => (
                                <Link
                                    key={categoryId}
                                    value={categoryId}
                                    className="text-black hover:bg-gray-100 cursor-pointer"
                                    to={`/shop?filterCategories=${categoryId}`}
                                    onClick={() => setSelectingCategory(!selectingCategory)}
                                >
                                    {allCategories.byId[categoryId].name}
                                </Link>
                            ))
                        }
                        </div>
                    }
                </div>
                <NavLink
                    to="/services"
                    className="text-black hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    SERVICES
                </NavLink>
                <NavLink
                    to="/cats"
                    className="text-black hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    CATS
                </NavLink>
                <NavLink
                    to="/dogs"
                    className="text-black hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    DOGS
                </NavLink>
                <NavLink
                    to="/shop"
                    className="text-black hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    SHOP
                </NavLink>
                <NavLink
                    to="/about"
                    className="text-black hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    ABOUT US
                </NavLink>
                <NavLink
                    to="/contact"
                    className="text-black hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    CONTACT
                </NavLink>
                <button className="text-black hover:text-gray-300"> LOGIN </button>
            </nav>
        </div>
    );
};
