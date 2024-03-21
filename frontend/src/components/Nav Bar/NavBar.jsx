import { NavLink } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav>
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                HOME 
            </NavLink>
            <NavLink
                to="/categories"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                CATEGORIES 
            </NavLink>
            <NavLink
                to="/services"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                
                SERVICES 
            </NavLink>
            <NavLink
                to="/cats"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                CATS 
            </NavLink>
            <NavLink
                to="/dogs"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                DOGS 
            </NavLink>
            <NavLink
                to="/shop"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                SHOP 
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                ABOUT US 
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                CONTACT 
            </NavLink>
            <NavLink
                to="/singIn"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                SIGN IN
            </NavLink>
        </nav>
    )
}
