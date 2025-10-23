import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    age: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "surname", "username", "email", "password", "age"];
    for (const field of requiredFields) {
      if (!formData[field]?.toString().trim()) {
        toast.error("Barcha maydonlarni to'ldiring!");
        return;
      }
    }

    if (isNaN(formData.age) || formData.age < 10 || formData.age > 100) {
      toast.error("Yosh 10 dan 100 gacha bo'lishi kerak.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Yaroqsiz email manzili.");
      return;
    }

    try {
      // Email mavjudligini tekshirish
      const emailCheckRes = await fetch(
        `http://localhost:5000/users?email=${encodeURIComponent(formData.email)}`
      );
      const emailExists = await emailCheckRes.json();
      if (emailExists.length > 0) {
        toast.error("Bu email allaqachon ro'yxatdan o'tgan.");
        return;
      }

      // Username mavjudligini tekshirish
      const usernameCheckRes = await fetch(
        `http://localhost:5000/users?username=${encodeURIComponent(formData.username)}`
      );
      const usernameExists = await usernameCheckRes.json();
      if (usernameExists.length > 0) {
        toast.error("Bu foydalanuvchi nomi allaqachon mavjud.");
        return;
      }

      // Yangi foydalanuvchini yaratish
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
        toast.success("Muvaffaqiyatli ro'yxatdan o'tildi!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error("Ro'yxatdan o'tishda xatolik yuz berdi.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Serverga ulanishda xatolik. JSON Server ishlayaptimi?");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#071024] to-[#0b1020] p-6">
      {/* Orqa fon effektlari */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400 opacity-30 blur-3xl transform rotate-12"></div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-500 opacity-25 blur-3xl transform -rotate-6"></div>
      </div>

      <ToastContainer />

      <main className="w-full max-w-md p-6">
        <section className="bg-white/6 backdrop-blur-sm border border-white/8 rounded-3xl shadow-[0_10px_30px_rgba(2,6,23,0.6)] p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">Ro'yxatdan o'tish</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "name", placeholder: "Ism", type: "text" },
              { name: "surname", placeholder: "Familiya", type: "text" },
              { name: "username", placeholder: "Foydalanuvchi nomi", type: "text" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "password", placeholder: "Parol (kamida 6 ta)", type: "password" },
              { name: "age", placeholder: "Yosh (10–100)", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-300">
                  {field.placeholder}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min={field.name === "age" ? "10" : undefined}
                  max={field.name === "age" ? "100" : undefined}
                  required
                  className="mt-2 block w-full rounded-xl bg-white/6 border border-white/12 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 px-4 py-3 text-white"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            {/* Role tanlash */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Rol
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 px-4 py-3"
              >
                <option value="customer" className="bg-[#0f172a] text-white">Mijoz</option>
                <option value="seller" className="bg-[#0f172a] text-white">Sotuvchi</option>
                <option value="support" className="bg-[#0f172a] text-white">Qo'llab-quvvatlash</option>
                <option value="manager" className="bg-[#0f172a] text-white">Menejer</option>
                <option value="admin" className="bg-[#0f172a] text-white">Admin</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          </form>

          <hr className="my-6 border-white/6" />
          <p className="text-xs text-slate-400 text-center">
            Hisobingiz bormi?{" "}
            <a href="/login" className="text-indigo-300 hover:underline">
              Tizimga kirish
            </a>
          </p>
        </section>
      </main>

      
    </div>
  );
}

export default Signup;