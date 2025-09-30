import React, { useState, useEffect, useRef } from "react";
import "./style.css";
function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverSoundRef = useRef(null);
  const activeSoundRef = useRef(null);

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

  const handleMouseEnter = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if (activeSoundRef.current) {
      activeSoundRef.current.currentTime = 0;
      activeSoundRef.current.play();
    }
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
              onMouseEnter={handleMouseEnter}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <audio ref={hoverSoundRef} src="/src/assets/music/hoverSound.wav" />
      <audio
        ref={activeSoundRef}
        src="/src/assets/music/theChoosenOneSound.wav"
      />
    </div>
  );
}

export default SidebarNavigation;
