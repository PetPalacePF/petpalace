import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";

export const NavBar = ({ allCategories }) => {
  const [selectingCategory, setSelectingCategory] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      axios
        .post(`${BACKEND_URL}/users`, {
          email: user.email,
          name: user.name,
        })
        .then((response) => {
          window.localStorage.setItem(
            "userData",
            JSON.stringify(response.data.user)
          );
        })
        .catch((error) => {
          console.error("Error storing user data:", error);
        });
    } 
    // else {
    //   window.localStorage.removeItem("userData");
    // }
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    // Limpiar localStorage cuando el usuario se desloguee
    window.localStorage.removeItem("userData");
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="absolute top-[76px] left-0 right-0 flex justify-center z-10">
      <nav className="bg-white p-4 border shadow-lg rounded-lg flex gap-[56px] w-[1400px] h-[70px] items-center mx-auto justify-center">
        <NavLink
          to="/"
          className="text-black hover:text-gray-300"
          activeclassname="font-bold"
        >
          HOME
        </NavLink>
        <div className="relative">
          <div onClick={() => setSelectingCategory(!selectingCategory)}>
            <p className="uppercase cursor-pointer">Categories</p>
          </div>
          {selectingCategory && (
            <div className="absolute left-1/2 -translate-x-1/2 bg-white w-[500px] h-[150px] p-5 flex flex-col flex-wrap">
              {allCategories.allIds.map((categoryId) => (
                <Link
                  key={categoryId}
                  value={categoryId}
                  className="text-black hover:bg-gray-100 cursor-pointer"
                  to={`/shop?filterCategories=${categoryId}`}
                  onClick={() => setSelectingCategory(!selectingCategory)}
                >
                  {allCategories.byId[categoryId].name}
                </Link>
              ))}
            </div>
          )}
        </div>
        {/*<NavLink
          to="/services"
          className="text-black hover:text-gray-300"
          activeclassname="font-bold"
        >
          SERVICES
        </NavLink> */}
        {/* <NavLink
          to="/cats"
          className="text-black hover:text-gray-300"
          activeclassname="font-bold"
        >
          CATS
        </NavLink> */}
        {/* <NavLink
          to="/dogs"
          className="text-black hover:text-gray-300"
          activeclassname="font-bold"
        >
          DOGS
        </NavLink>*/}
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
        {isAuthenticated ? (
          <button
            className="text-black hover:text-gray-300"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        ) : (
          <button
            className="text-black hover:text-gray-300"
            onClick={() => loginWithRedirect()}
          >
            LOGIN
          </button>
        )}
        {isAuthenticated && (
          <Link to="/admin" className="uppercase">
            Admin
          </Link>
        )}
      </nav>
    </div>
  );
};

{
  /* <NavLink
  to="/services"
  className="text-black hover:text-gray-300"
  activeclassname="font-bold"
>
  SERVICES
</NavLink> */
}
{
  /* <NavLink
  to="/cats"
  className="text-black hover:text-gray-300"
  activeclassname="font-bold"
>
  CATS
</NavLink> */
}
{
  /* <NavLink
  to="/dogs"
  className="text-black hover:text-gray-300"
  activeclassname="font-bold"
>
  DOGS
</NavLink> */
}
