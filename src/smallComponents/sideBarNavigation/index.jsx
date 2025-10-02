import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { label: "Home" },
    { label: "Products" },
    { label: "Users" },
    { label: "Archieve" },
    { label: "Categories" },
    { label: "Analytics" },
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
              to={item.label == "Home" ? "/" : `/${item.label.toLowerCase()}`}
            >
              {" "}
              <li
                key={index}
                className={`menu-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => handleItemClick(index)}
              >
                <span className="icon">{item.icon}</span>
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
