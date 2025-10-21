import React, { useState, useEffect } from "react";
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
import { IoAccessibilitySharp } from "react-icons/io5";
import { TbMessageChatbot } from "react-icons/tb";
import { useLocation } from "react-router-dom";

function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loc, setLoc] = useState("");

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    setLoc(location.pathname.slice(1));
  }, [location.pathname]);

  const menuItems = [
    { label: "Dashboard", icon: <FaHome /> },
    { label: "Products", icon: <FaCartArrowDown /> },
    { label: "Users", icon: <FaUserShield /> },
    { label: "Customers", icon: <IoAccessibilitySharp /> },
    { label: "Orders", icon: <FaBoxArchive /> },
    { label: "Analytics", icon: <SiSimpleanalytics /> },
    { label: "Settings", icon: <IoMdSettings /> },
    { label: "Archieve", icon: <MdDelete /> },
    { label: "Profile", icon: <CgProfile /> },
    { label: "Chatbot", icon: <TbMessageChatbot /> },
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
              to={
                item.label == "Home"
                  ? "/dashboard"
                  : `/${item.label.toLowerCase()}`
              }
            >
              {" "}
              <li
                key={index}
                className={`menu-item ${
                  loc === item.label.toLowerCase() ? "active" : ""
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
