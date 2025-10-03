import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaUserShield } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";


function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { label: "Dashboard", icon: <FaHome /> },
    { label: "Products", icon: <FaCartArrowDown /> },
    { label: "Users", icon: <FaUserShield /> },
    { label: "Categories", icon: <FaBoxArchive /> },
    { label: "Analytics", icon: <SiSimpleanalytics /> },
    { label: "Settings", icon: <IoMdSettings /> },
    { label: "Archieve", icon: <MdDelete /> },
    { label: "Profile", icon: <CgProfile /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="app">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <Link
              to={item.label == "Home" ? "/dashboard" : `/${item.label.toLowerCase()}`}
            >
              {" "}
              <li
                key={index}
                className={`menu-item ${
                  activeIndex === index ? "active" : ""
                } flex`}
                onClick={() => handleItemClick(index)}
              >
                <span className="icon">{item.icon ? item.icon : null}</span>
                <span className="label">{item.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SidebarNavigation;
