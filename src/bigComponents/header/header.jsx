import React from "react";
import mainLogo from "../../bigComponents/header/img/mainLogo.png";
import userLogo from "../../bigComponents/header/img/userLogo.png";

export default function Header({namePage}) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        <img src={mainLogo} alt="logo" className="w-[183] h-[36]" />
        <span className="text-lg text-gray-700">{namePage}</span>
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

        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer">
          <i className="fas fa-cog text-gray-500"></i>
        </div>

        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-100 cursor-pointer relative">
          <i className="fas fa-bell text-pink-500"></i>
        </div>

        <div>
          <img
            src={userLogo}
            alt="user"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}