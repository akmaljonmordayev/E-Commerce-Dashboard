import React, { useState } from "react";
import useGet from "../../customHooks/useGet";
import { useNavigate } from "react-router-dom";
function Profile() {
  let id = localStorage.getItem("userId");
  const { data: user, error, success } = useGet(`/users/${id}`);

  let navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "hello",
    email: "sofiya@example.com",
    profession: "Frontend Developer",
    bio: "Creative developer passionate about building elegant, dynamic, and user-friendly web interfaces using React and Tailwind CSS.",
  });

  let bgClass =
    "bg-gradient-to-br from-indigo-900 via-blue-950 to-indigo-900 text-white";
  let cardClass = "bg-blue-950/70 border-blue-800";
  let textMuted = "text-blue-300";
  let textSoft = "text-blue-200";
  let borderColor = "border-blue-500";
  let statBg = "bg-blue-800/50 hover:bg-blue-700/50";
  let btnPrimary = "bg-blue-600 hover:bg-blue-500 hover:shadow-blue-600/40";
  let btnOutline = "border-blue-400 hover:bg-blue-800 hover:shadow-blue-500/40";
  let linkColor = "text-blue-400 hover:text-blue-300";

  if (!darkMode) {
    bgClass =
      "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900";
    cardClass = "bg-white/70 border-gray-300";
    textMuted = "text-blue-700";
    textSoft = "text-gray-700";
    borderColor = "border-blue-400";
    statBg = "bg-blue-100 hover:bg-blue-200";
    btnPrimary = "bg-blue-500 text-white hover:bg-blue-400";
    btnOutline = "border-blue-500 text-blue-800 hover:bg-blue-100";
    linkColor = "text-blue-600 hover:text-blue-500";
  }

  let logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-all duration-700 ${bgClass}`}
    >
      <button
        onClick={logOut}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-300 hover:scale-105 bg-red-600 hover:bg-red-500 text-white"
      >
        Logout
      </button>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 left-6 px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-300 hover:scale-105 bg-yellow-400 text-gray-900 hover:bg-yellow-300"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      {user && (
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-lg leading-tight truncate">
                  {user.name} {user.surname}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  @{user.username}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === "admin"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-800"
                  } dark:bg-slate-700 dark:text-slate-200`}
                >
                  {user.role}
                </span>
              </div>
            </div>

            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-2">
              <div className="truncate">
                <div className="text-xs text-slate-400">Email</div>
                <div className="truncate">{user.email}</div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Age</div>
                <div>{user.age}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
