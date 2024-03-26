import { NavLink } from "react-router-dom";

export const NavBar = ( ) => {
    return (
        <div className="absolute top-[55px] left-0 right-0 flex justify-center z-10">
            <nav className="bg-white p-4 border shadow-lg rounded-lg">
                <NavLink
                    to="/"
                    className="text-black mr-4 hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    HOME
                </NavLink>
                <button className="text-black mr-4 hover:text-gray-300">
                    CATEGORIES
                </button>
                <NavLink
                    to="/services"
                    className="text-black mr-4 hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    SERVICES
                </NavLink>
                <NavLink
                    to="/cats"
                    className="text-black mr-4 hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    CATS
                </NavLink>
                <NavLink
                    to="/dogs"
                    className="text-black mr-4 hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    DOGS
                </NavLink>
                <NavLink
                    to="/shop"
                    className="text-black mr-4 hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    SHOP
                </NavLink>
                <NavLink
                    to="/about"
                    className="text-black mr-4 hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    ABOUT US
                </NavLink>
                <NavLink
                    to="/contact"
                    className="text-black mr-4 hover:text-gray-300"
                    activeclassname="font-bold"
                >
                    CONTACT
                </NavLink>
                <button className="text-black hover:text-gray-300"> LOGOUT </button>
            </nav>
        </div>
    );
};
