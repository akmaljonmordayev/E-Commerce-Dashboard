import React, { useState, useEffect } from "react";
import useGet from "../../customHooks/useGet";
import { useNavigate } from "react-router-dom";
import api from "../../service/axios";

function Profile() {
  const id = localStorage.getItem("userId");
  const { data: user, loading, error } = useGet(`/users/${id}`);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    age: "",
    role: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        username: user.username || "",
        email: user.email || "",
        age: user.age || "",
        role: user.role || "",
        password: user.password || "",
        image:
          user.image ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
    }
  }, [user]);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleEdit = () => setShowModal(true);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/users/${id}`, formData);
      alert("Profil muvaffaqiyatli yangilandi ✅");
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Profilni yangilashda xatolik ❌");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-indigo-600 font-semibold text-lg animate-pulse">
        Ma’lumotlar yuklanmoqda...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-medium text-lg">
        Xatolik yuz berdi: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center bg-gray-50 text-gray-900">
      {/* Logout tugmasi */}
      <button
        onClick={logOut}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 bg-red-600 hover:bg-red-500 text-white"
      >
        Logout
      </button>

      {user && Object.keys(user).length > 0 ? (
        <div className="mt-20 max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          {/* Profil rasmi */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={
                user.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-indigo-300 shadow-md object-cover"
            />
            <h2 className="text-2xl font-bold text-indigo-700 mt-3 text-center">
              {user.name} {user.surname}
            </h2>
            <p className="text-gray-500 text-sm break-all text-center">
              @{user.username}
            </p>
          </div>

          {/* Ma’lumotlar */}
          <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-800">
            <div>
              <span className="text-gray-400 text-xs uppercase">Email</span>
              <div className="truncate max-w-[140px]" title={user.email}>
                {user.email}
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Yosh</span>
              <div>{user.age}</div>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Role</span>
              <div>{user.role}</div>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Parol</span>
              <div className="font-mono tracking-wide">
                {user.password ? "••••••••" : "N/A"}
              </div>
            </div>
          </div>

          {/* Edit tugmasi */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleEdit}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all duration-300 shadow-md"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-lg font-medium mt-20 animate-pulse">
          Foydalanuvchi topilmadi
        </p>
      )}

      {/* Modal oynasi */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4 text-center">
              Profilni tahrirlash
            </h3>

            <div className="space-y-3">
              {[
                "name",
                "surname",
                "username",
                "email",
                "age",
                "role",
                "password",
                "image",
              ].map((field) => (
                <div key={field}>
                  <label
                    className="text-sm text-gray-600 capitalize"
                    htmlFor={field}
                  >
                    {field}
                  </label>
                  <input
                    type={
                      field === "age"
                        ? "number"
                        : field === "password"
                        ? "text"
                        : "text"
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
