import React, { useEffect, useState } from "react";
import mainLogo from "../../bigComponents/header/img/mainLogo7.png";
import userLogo from "../../bigComponents/header/img/userLogo2.png";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGet from "../../customHooks/useGet";

export default function Header({ namePage }) {
  const navigate = useNavigate();
  let id = localStorage.getItem("userId");
  const { data: user } = useGet(`/users/${id}`);
  const location = useLocation();
  const [text, setText] = useState(localStorage.getItem("lastPage") || "Home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem("lastPage") || "Home";
    setText(value);
  }, [location.pathname]);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm relative">
      <div className="flex items-center space-x-3">
        <Link to={"/dashboard"}>
          <img src={mainLogo} alt="logo" className="w-[150px] h-[80px]" />
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

        <Link to={"/message"}>
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-100 cursor-pointer relative">
            <FaBell className="text-[22px] text-[#FE5C73]" />
          </div>
        </Link>

        <div className="relative">
          <img
            src={userLogo}
            alt="user"
            className="w-[38px] h-[38px] rounded-full object-cover cursor-pointer border border-gray-400 hover:border-[#22d3ee] transition-all"
            onClick={() => setOpen(!open)}
          />

          {open && user && (
            <div className="absolute right-0 mt-2 w-64 bg-[#1f2a40] border border-gray-600 rounded-xl p-4 z-50 text-white shadow-[0_0_15px_#22d3ee]">
              <Link to={"/profile"}>
                <h3 className="text-center text-lg font-semibold mb-3 border-b border-gray-600 pb-2 hover:text-[#22d3ee] transition">
                  Profile →
                </h3>
              </Link>

              <div className="space-y-2 text-sm">
                <div className="flex justify-center gap-[10px]">
                  <span>{user.name || "—"}</span>
                  <span>{user.surname || "—"}</span>
                </div>
                <div className="flex justify-center pb-1">
                  <span>{user.role || "User"}</span>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={logOut}
                    className="px-4 py-2 rounded-lg font-medium shadow-lg 
                   transition-all duration-300 hover:scale-105 bg-red-600 hover:bg-red-500 text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
