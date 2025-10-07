import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.password) {
      setError("Barcha maydonlarni to'ldiring!");
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
      const response = await fetch("http://localhost:3001/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setError("");
        setFormData({ name: "", email: "", phone: "", address: "", password: "" });
      } else {
        setError("Ro'yxatdan o'tishda xatolik yuz berdi.");
      }
    } catch (err) {
      setError("Serverga ulanishda xatolik. JSON Server ishlayaptimi?");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Ro'yxatdan o'tish
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hisobingizni yarating va xizmatlarimizdan foydalaning.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md text-sm">
            Muvaffaqiyatli ro'yxatdan o'tildi! Endi tizimga kira olasiz.
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Ism Familiya"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email manzil"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <input
              name="phone"
              type="tel"
              placeholder="Telefon (+998...)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <input
              name="address"
              type="text"
              placeholder="Manzil (Shahar, mamlakat)"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Parol (kamida 6 ta belgi)"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ro'yxatdan o'tish
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>
            Hisobingiz bormi?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Kirish
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;