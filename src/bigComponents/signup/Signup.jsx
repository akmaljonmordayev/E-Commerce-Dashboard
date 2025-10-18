// src/signup/Signup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 navigatsiya uchun

function Signup() {
  const navigate = useNavigate(); // 👈 hook

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    age: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "surname",
      "username",
      "email",
      "password",
      "age",
      "role",
    ];

    for (const field of requiredFields) {
      if (!formData[field]?.toString().trim()) {
        setError("Barcha maydonlarni to'ldiring!");
        return;
      }
    }

    if (isNaN(formData.age) || formData.age < 10 || formData.age > 100) {
      setError("Yosh 10 dan 100 gacha bo'lishi kerak.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Yaroqsiz email manzili.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age, 10),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setError("");

        // 👇 1.5 soniyadan keyin login sahifasiga yo'naltirish
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errorText = await response.text();
        setError(`Xatolik: ${errorText || "Ro'yxatdan o'tishda muammo"}`);
      }
    } catch (err) {
      setError("Serverga ulanishda xatolik. JSON Server ishlayaptimi?");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Ro'yxatdan o'tish
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Kerakli ma'lumotlarni kiriting.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100">
              Muvaffaqiyatli ro'yxatdan o'tildi! Endi tizimga kira olasiz.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "name", placeholder: "Ism", type: "text" },
              { name: "surname", placeholder: "Familiya", type: "text" },
              { name: "username", placeholder: "Foydalanuvchi nomi", type: "text" },
              { name: "email", placeholder: "Email manzil", type: "email" },
              {
                name: "password",
                placeholder: "Parol (kamida 6 ta belgi)",
                type: "password",
              },
              {
                name: "age",
                placeholder: "Yoshingiz",
                type: "number",
                min: "10",
                max: "100",
              },
            ].map((field) => (
              <div key={field.name}>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min={field.min}
                  max={field.max}
                  className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-gray-600 text-sm mb-1">Rol tanlang</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-gray-300 py-3 px-1 text-gray-700 focus:outline-none focus:border-indigo-500"
              >
                <option value="customer">Mijoz</option>
                <option value="seller">Sotuvchi</option>
                <option value="support">Qo'llab-quvvatlash</option>
                <option value="manager">Menejer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Ro'yxatdan o'tish
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Hisobingiz bormi?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Kirish
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;