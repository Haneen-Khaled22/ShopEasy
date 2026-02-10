import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; 
import shopicon from "../../assets/shopeasy.png"
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cart = useSelector((state)=>state.cart);

  const navigate = useNavigate();
  function navigateToCart(){
    navigate('/cart')
  }

  return (
  <nav className="bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
    <div className="flex flex-wrap items-center justify-between h-22">

      {/* Left Side: Logo + Name + Links */}
      <div className="flex items-center space-x-6 flex-wrap">
        {/* Logo + Name */}
        <div className="flex items-center space-x-1">
          <img
            src={shopicon}
            alt="ShopEasy Logo"
            className="h-9 w-9 object-cover"
          />
          <span className="text-xl font-bold text-gray-800 font-serif">
            ShopEasy
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 flex-wrap">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-900 underline text-md font-medium"
                : "text-gray-800 hover:underline text-md font-medium"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-red-900 underline text-md font-medium"
                : "text-gray-800 hover:underline text-md font-medium"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-red-900 underline text-md font-medium"
                : "text-gray-800 hover:underline text-md font-medium"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-red-900 underline text-md font-medium"
                : "text-gray-800 hover:underline text-md font-medium"
            }
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* Right Side: Mobile button + Cart + User */}
      <div className="flex items-center space-x-4 flex-wrap">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-black focus:outline-none cursor-pointer"
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Sign In / Cart */}
        <button className="bg-black text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
          SIGN IN / UP
        </button>

        <button
        onClick={navigateToCart}
        className="bg-black relative text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
          
          <HiOutlineShoppingBag className="w-5 h-5 text-white" />

       { cart.length>0?    <span className="
      absolute
      -top-2
      -right-2
       w-6
       h-6
      p-1
      bg-red-800
      text-white
      text-sm
      rounded-full
      flex
      items-center
      justify-center
      font-normal
      
      
    ">{cart.length}</span>:null}

        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-10 w-10 rounded-full overflow-hidden border border-gray-300"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="h-full w-full object-cover"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-20">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Mobile Menu Links */}
    {mobileOpen && (
      <div className="md:hidden mt-2 space-y-2 pb-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-2 text-red-900 underline font-medium"
              : "block px-3 py-2 text-gray-800 hover:underline font-medium"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-2 text-red-900 underline font-medium"
              : "block px-3 py-2 text-gray-800 hover:underline font-medium"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-2 text-red-900 underline font-medium"
              : "block px-3 py-2 text-gray-800 hover:underline font-medium"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-2 text-red-900 underline font-medium"
              : "block px-3 py-2 text-gray-800 hover:underline font-medium"
          }
        >
          Contact
        </NavLink>
      </div>
    )}
  </div>
</nav>

  );
};

export default Navbar;
