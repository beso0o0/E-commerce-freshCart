// Navbar.jsx
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { getCart, cart, setCart } = useContext(CartContext);
  const { getWishlist, wishlist, setWishlist } = useContext(WishlistContext);

  const [navOpen, setNavOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("60px");

  useEffect(() => {
    if (userLogin) {
      getCart();
      getWishlist();
    } else {
      setCart([]); // Clear the cart if the user is logged out
      setWishlist([]); // Clear the wishlist if the user is logged out
    }
  }, [userLogin]);

  function signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    setCart([]); // Clear the cart state
    setWishlist([]); // Clear the wishlist state
    navigate("/login");
  }

  function toggleNav() {
    if (navOpen) {
      setMaxHeight("60px"); // Collapse to 60px when closing
    } else {
      setMaxHeight("500px"); // Expand to 500px when opening
    }
    setNavOpen(!navOpen);
  }

  function handleLinkClick() {
    setMaxHeight("60px");
    setNavOpen(false);
  }

  return (
    <nav
      className="shadow-lg bg-gray-200 md:fixed top-0 inset-x-0 rounded-md md:rounded-full py-2 md:px-32 md:py-6 capitalize z-50 overflow-hidden transition-[max-height] duration-1000 ease-in-out"
      style={{ maxHeight }}
    >
      <i
        className="fa-solid fa-bars text-3xl absolute top-5 cursor-pointer left-5 md:invisible me-3"
        onClick={toggleNav}
      ></i>
      <img
        className="md:hidden my-4 ms-20 md:my-0"
        src={logo}
        width={120}
        alt=""
      />
      <div className="flex flex-col md:flex-row text-gray-500">
        <div className="flex flex-col md:items-center md:justify-between md:flex-row space-x-3">
          <img
            className="hidden md:block my-4 ms-20 md:my-0"
            src={logo}
            width={120}
            alt=""
          />

          {userLogin && (
            <ul className=" md:flex md:flex-row space-x-2 mb-6 md:mb-0 ms-3">
              <li className="ms-2">
                <NavLink to="" onClick={handleLinkClick}>
                  <span className="hover:text-green-600">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="products" onClick={handleLinkClick}>
                  <span className="hover:text-green-600">Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="categories" onClick={handleLinkClick}>
                  <span className="hover:text-green-600">Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="brands" onClick={handleLinkClick}>
                  <span className="hover:text-green-600">Brands</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="allorders" onClick={handleLinkClick}>
                  <span className="hover:text-green-600">MyOrders</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="text-center ms-4 md:absolute end-7 pe-20 ">
          <ul className="flex flex-row space-x-4">
            {userLogin ? (
              <>
                <ul className="flex gap-x-4">
                  <li className="relative">
                    <NavLink to="/wishlist" onClick={handleLinkClick}>
                      <i className="fa-solid fa-heart fa-xl"></i>
                    </NavLink>
                    <span className="absolute left-4 bottom-4 rounded-full w-[23px] h-[23px] bg-green-600 text-white">
                      {wishlist?.count ?? 0}
                    </span>
                  </li>
                  <li className="relative">
                    <NavLink to="cart" onClick={handleLinkClick}>
                      <i className="fa-solid fa-cart-shopping fa-xl "></i>
                    </NavLink>
                    <span className="absolute left-4 bottom-4 rounded-full w-[23px] h-[23px] bg-green-600 text-white">
                      {cart?.numOfCartItems ?? 0}
                    </span>
                  </li>
                </ul>
                <div className="icons flex gap-2 text-gray-800 ps-3">
                  <i className="fab fa-facebook text-lg pt-1"></i>
                  <i className="fab fa-youtube text-lg pt-1"></i>
                  <i className="fab fa-tiktok text-lg pt-1"></i>
                  <i className="fa-brands fa-instagram text-lg pt-1"></i>
                </div>
                <li className="absolute top-6 end-10 md:static md:pe-16">
                  <span
                    onClick={signout}
                    className=" cursor-pointer text-gray-600"
                  >
                    Logout
                    <i className="ms-2 fa-solid fa-right-from-bracket"></i>
                  </span>
                </li>
              </>
            ) : (
              <>
                <ul className="flex gap-x-2 absolute top-6 md:top-0 end-5">
                  <li>
                    <NavLink to="login" onClick={handleLinkClick}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="register" onClick={handleLinkClick}>
                      Register
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
