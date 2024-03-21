import { NavLink } from "react-router-dom";

export const NavBar = () => {
    return (
        <div className="flex justify-center mt-[-20px]">
            <nav className="bg-white p-4 border shadow-lg rounded-lg">
                <NavLink
                    to="/"
                    className="text-black mr-4 hover:text-gray-300"
                    activeClassName="font-bold"
                >
                    HOME
                </NavLink>
                <button className="text-black mr-4 hover:text-gray-300">
                    CATEGORIES
                </button>
                <NavLink
                    to="/services"
                    className="text-black mr-4 hover:text-gray-300"
                    activeClassName="font-bold"
                >
                    SERVICES
                </NavLink>
                <NavLink
                    to="/cats"
                    className="text-black mr-4 hover:text-gray-300"
                    activeClassName="font-bold"
                >
                    CATS
                </NavLink>
                <NavLink
                    to="/dogs"
                    className="text-black mr-4 hover:text-gray-300"
                    activeClassName="font-bold"
                >
                    DOGS
                </NavLink>
                <NavLink
                    to="/shop"
                    className="text-black mr-4 hover:text-gray-300"
                    activeClassName="font-bold"
                >
                    SHOP
                </NavLink>
                <NavLink
                    to="/aboutUs"
                    className="text-black mr-4 hover:text-gray-300"
                    activeClassName="font-bold"
                >
                    ABOUT US
                </NavLink>
                <NavLink
                    to="/contact"
                    className="text-black mr-4 hover:text-gray-300"
                    activeClassName="font-bold"
                >
                    CONTACT
                </NavLink>
                <button className="text-black hover:text-gray-300"> LOGOUT </button>
            </nav>
        </div>
    );
};
