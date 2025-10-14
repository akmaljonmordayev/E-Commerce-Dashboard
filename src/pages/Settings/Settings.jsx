import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: "Ali Valiyev",
    email: "ali.valiyev@example.com",
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const [integrations, setIntegrations] = useState({
    google: true,
    slack: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTwoFactor = () => {
    setSecurity((prev) => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
  };

  const toggleIntegration = (service) => {
    setIntegrations((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  const handleChangePassword = () => {
    const newPassword = prompt("Yangi parolni kiriting:");
    if (newPassword && newPassword.length >= 6) {
      alert("Parol muvaffaqiyatli o'zgartirildi!");
    } else if (newPassword) {
      alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
    }
  };

  const handleSave = () => {
    const allSettings = {
      profile,
      security,
      notifications,
      integrations,
    };
    console.log("Saqlanayotgan sozlamalar:", allSettings);
    alert("✅ Barcha o'zgarishlar muvaffaqiyatli saqlandi!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Sozlamalar</h1>
          <p className="mt-2 text-gray-600">
            Hisobingizni sozlang, xavfsizlikni mustahkamlang va tajribangizni shaxsiylashtiring.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Profil sozlamalari</h2>
            <p className="text-gray-600 text-sm mt-1">
              Shaxsiy ma'lumotlarni tahrirlash, profil rasmini yuklash, parolni o'zgartirish.
            </p>
          </div>
          <div className="px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Ism va familiya</span>
              <span className="text-sm text-gray-600">{profile.fullName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Elektron pochta</span>
              <span className="text-sm text-gray-600">{profile.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Profil rasmi</span>
              <span className="text-sm text-blue-600 cursor-pointer">Yuklash</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Parolni o'zgartirish</span>
              <button
                onClick={handleChangePassword}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                O'zgartirish
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Xavfsizlik sozlamalari</h2>
            <p className="text-gray-600 text-sm mt-1">
              Hisobingizni himoya qiling: 2FA, sessiyalar, xavfsizlik savollari.
            </p>
          </div>
          <div className="px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Ikki bosqichli autentifikatsiya (2FA)
              </span>
              <button
                onClick={toggleTwoFactor}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  security.twoFactorAuth ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    security.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Qo'shimcha xavfsizlik savollari
              </span>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                Sozlash
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Bildirishnoma sozlamalari</h2>
            <p className="text-gray-600 text-sm mt-1">
              Har bir turdagi bildirishnomalarni alohida boshqaring.
            </p>
          </div>
          <div className="px-6 py-5 space-y-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {key === "email"
                    ? "Email orqali bildirishnomalar"
                    : key === "push"
                    ? "Push bildirishnomalar"
                    : "SMS xabarlar"}
                </span>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Integratsiyalar</h2>
            <p className="text-gray-600 text-sm mt-1">
              Tashqi xizmatlarga ulanish va API boshqaruvi.
            </p>
          </div>
          <div className="px-6 py-5 space-y-4">
            {Object.entries(integrations).map(([service, connected]) => (
              <div key={service} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </span>
                <button
                  onClick={() => toggleIntegration(service)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {connected ? "Ulangan" : "Ulanmagan"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            O'zgarishlarni saqlash
          </button>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Barcha o'zgarishlar saqlash tugmasini bosgandan so'ng qo'llaniladi.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;