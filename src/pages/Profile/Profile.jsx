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
        password: "",
      });
    }
  }, [user]);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleEdit = () => {
    if (user && Object.keys(user).length > 0) {
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...formData };
      if (!updatedData.password) delete updatedData.password;

      await api.put(`/users/${id}`, updatedData);
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
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900">
      <button
        onClick={logOut}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg font-medium shadow-lg 
                   transition-all duration-300 hover:scale-105 bg-red-600 hover:bg-red-500 text-white"
      >
        Logout
      </button>

      {user && Object.keys(user).length > 0 ? (
        <div className="max-w-md w-full bg-white border border-indigo-200 rounded-2xl shadow-xl p-6 
                        hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold text-indigo-800">User Profile</h2>
            <button
              onClick={handleEdit}
              className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-all"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-800">
            <div>
              <span className="text-gray-400 text-xs uppercase">Name</span>
              <div>{user.name}</div>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Surname</span>
              <div>{user.surname}</div>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Username</span>
              <div>@{user.username}</div>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Email</span>
              <div>{user.email}</div>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Age</span>
              <div>{user.age}</div>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Role</span>
              <div>{user.role}</div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Foydalanuvchi topilmadi
        </p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">
              Edit Profile
            </h3>

            <div className="space-y-3">
              {["name", "surname", "username", "email", "age", "role", "password"].map((field) => (
                <div key={field}>
                  <label
                    className="text-sm text-gray-600 capitalize"
                    htmlFor={field}
                  >
                    {field}
                  </label>
                  <input
                    type={field === "age" ? "number" : field === "password" ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={
                      field === "password"
                        ? "Yangi parol kiriting (ixtiyoriy)"
                        : ""
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 
                               focus:ring-indigo-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
