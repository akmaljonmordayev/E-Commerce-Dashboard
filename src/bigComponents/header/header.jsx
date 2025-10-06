import React, { useEffect, useState } from "react";
import mainLogo from "../../bigComponents/header/img/mainLogo.png";
import userLogo from "../../bigComponents/header/img/userLogo.png";

import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import AdminLogo from "../../smallComponents/logo/logo";

import { Link, useLocation } from "react-router-dom";

export default function Header({ namePage }) {
  const location = useLocation();
  const [text, setText] = useState(localStorage.getItem("lastPage") || "Home");

  useEffect(() => {
    const value = localStorage.getItem("lastPage") || "Home";
    setText(value);
  }, [location.pathname]);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        <Link to={"/dashboard"}>
          <img src={mainLogo} alt="logo" className="w-[183] h-[36]" />
        </Link>

        <span className="text-lg text-gray-700">
          {text === "/" ? "Home" : text.slice(1) + "_page"}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative pr-[40px]">
          <input
            type="text"
            placeholder="Search for something"
            className="pl-10 pr-4 py-2 w-64 rounded-full bg-gray-100 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <Link to={"/settings"}>
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer">
            <IoMdSettings className="text-[22px] text-[#718EBF]" />
          </div>
        </Link>

        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-100 cursor-pointer relative">
          <FaBell className="text-[22px] text-[#FE5C73]" />
        </div>

        <Link to={"/profile"}>
          <div>
            <img
              src={userLogo}
              alt="user"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
