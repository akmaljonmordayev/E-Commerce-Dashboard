import React, { useState } from "react";
import "./style.css";
function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { label: "Dashboard" },
    { label: "Transactions" },
    { label: "Accounts" },
    { label: "Investments" },
    { label: "Credit Cards" },
    { label: "Loans" },
    { label: "Services" },
    { label: "My Privileges" },
    { label: "Setting" },
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
            <li
              key={index}
              className={`menu-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleItemClick(index)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
    </ul>
  </div>
</div>
  );
}

export default SidebarNavigation;
