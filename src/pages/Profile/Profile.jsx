import React, { useState } from "react";

function Profile() {
  const [darkMode, setDarkMode] = useState(true);

  let bgClass = "bg-gradient-to-br from-indigo-900 via-blue-950 to-indigo-900 text-white";
  let cardClass = "bg-blue-950/70 border-blue-800";
  let textMuted = "text-blue-300";
  let textSoft = "text-blue-200";
  let borderColor = "border-blue-500";
  let statBg = "bg-blue-800/50 hover:bg-blue-700/50";
  let btnPrimary = "bg-blue-600 hover:bg-blue-500 hover:shadow-blue-600/40";
  let btnOutline = "border-blue-400 hover:bg-blue-800 hover:shadow-blue-500/40";
  let linkColor = "text-blue-400 hover:text-blue-300";

  if (!darkMode) {
    bgClass = "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900";
    cardClass = "bg-white/70 border-gray-300";
    textMuted = "text-blue-700";
    textSoft = "text-gray-700";
    borderColor = "border-blue-400";
    statBg = "bg-blue-100 hover:bg-blue-200";
    btnPrimary = "bg-blue-500 text-white hover:bg-blue-400";
    btnOutline = "border-blue-500 text-blue-800 hover:bg-blue-100";
    linkColor = "text-blue-600 hover:text-blue-500";
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-all duration-700 ${bgClass}`}>
      <button className="absolute top-6 right-6 px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-300 hover:scale-105 bg-red-600 hover:bg-red-500 text-white">
        Logout
      </button>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 left-6 px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-300 hover:scale-105 bg-yellow-400 text-gray-900 hover:bg-yellow-300"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <div className={`rounded-2xl p-8 w-full max-w-md text-center backdrop-blur-lg shadow-2xl border transition-all duration-700 ${cardClass}`}>
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co/3N6CkTb/profile-avatar.png"
            alt="Profile Avatar"
            className={`w-28 h-28 rounded-full border-4 shadow-lg hover:scale-105 transition-transform duration-300 ${borderColor}`}
          />
        </div>

        <h1 className="text-3xl font-bold mb-2 tracking-wide">Sofiya Rasulova</h1>
        <p className={`mb-6 text-sm uppercase tracking-widest ${textMuted}`}>Frontend Developer</p>
        <p className={`leading-relaxed mb-6 text-sm ${textSoft}`}>
          Creative developer passionate about building elegant, dynamic, and user-friendly web interfaces using React and Tailwind CSS. Dedicated
          to turning ideas into seamless digital experiences.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Projects", value: "120" },
            { label: "Clients", value: "85" },
            { label: "Years Exp", value: "5+" },
          ].map((stat, i) => (
            <div key={i} className={`rounded-lg py-3 transition duration-300 ${statBg}`}>
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <p className={`text-xs ${textMuted}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button className={`px-5 py-2 rounded-xl font-semibold transition duration-300 hover:shadow-lg hover:scale-105 ${btnPrimary}`}>
            Edit Profile
          </button>
          <button className={`px-5 py-2 rounded-xl font-semibold border transition duration-300 hover:shadow-md hover:scale-105 ${btnOutline}`}>
            Message
          </button>
        </div>

        <div className="flex justify-center gap-5 mt-6 text-sm">
          <a href="#" className={linkColor}>
            🌐 Website
          </a>
          <a href="#" className={linkColor}>
            💼 LinkedIn
          </a>
          <a href="#" className={linkColor}>
            🐙 GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
