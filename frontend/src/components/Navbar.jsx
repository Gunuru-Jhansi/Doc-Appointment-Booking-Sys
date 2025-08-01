import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData, setUserData } = useContext(AppContext);
  const logout = () => {
    // setToken(false);
    // localStorage.removeItem("token");
    setToken(false);
    setUserData(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-28 h-28 w-auto cursor-pointer object-contain transition-transform duration-300 hover:scale-105"
        src={assets.logobg1}
        alt="logo"
      />
      <ul className="hidden md:flex text-gray items-start gap-5 font-medium">
        <NavLink onClick={() => setShowMenu(false)} to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 dark:bg-secondary bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink onClick={() => setShowMenu(false)} to="/predictor">
          <li className="py-1">PREDICTOR</li>
          <hr className="border-none outline-none h-0.5 dark:bg-secondary bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink onClick={() => setShowMenu(false)} to="/doctors">
          <li className="py-1"> DOCTORS</li>
          <hr className="border-none outline-none h-0.5 dark:bg-secondary bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        {/* <NavLink onClick={() => setShowMenu(false)} to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 dark:bg-secondary bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink onClick={() => setShowMenu(false)} to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 dark:bg-secondary bg-primary w-3/5 m-auto hidden" />
        </NavLink> */}
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex item-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary dark:bg-secondary text-white dark:text-black dark:bg-secondary px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* -----------Mobile Menu----------- */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white dark:bg-black transition-all duration-500`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logobg1} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              {" "}
              <p className="px-4 py-2 rounded-full inline-block">HOME</p>{" "}
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/predictor">
              <p className="px-4 py-2 rounded-full inline-block">PREDICTOR</p>
            </NavLink>

            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded-full inline-block">DOCTORS</p>
            </NavLink>

            {/* <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded-full inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded-full inline-block">CONTACT</p>
            </NavLink> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
