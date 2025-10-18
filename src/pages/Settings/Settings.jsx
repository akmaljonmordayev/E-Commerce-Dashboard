import React, { useState, useEffect } from "react";

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

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState("");

  // Toast uchun state
  const [toast, setToast] = useState({ show: false, message: "" });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTwoFactor = () => {
    setSecurity((prev) => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
  };

  const toggleIntegration = (service) => {
    setSelectedIntegration(service);
    setIsIntegrationModalOpen(true);
  };

  const openPasswordModal = () => {
    setNewPassword("");
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setNewPassword("");
  };

  const handleSavePassword = () => {
    if (newPassword.length < 6) return;
    showTemporaryToast("Parol muvaffaqiyatli o'zgartirildi!");
    closePasswordModal();
  };

  const handleToggleTwoFactor = () => {
    setIsTwoFactorModalOpen(true);
  };

  const confirmTwoFactorToggle = () => {
    setSecurity((prev) => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
    showTemporaryToast("2FA sozlamalari yangilandi!");
    setIsTwoFactorModalOpen(false);
  };

  const confirmIntegrationToggle = () => {
    setIntegrations((prev) => ({
      ...prev,
      [selectedIntegration]: !prev[selectedIntegration],
    }));
    showTemporaryToast(`${selectedIntegration} integratsiyasi yangilandi!`);
    setIsIntegrationModalOpen(false);
  };

  const showTemporaryToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const handleSave = () => {
    const allSettings = {
      profile,
      security,
      notifications,
      integrations,
    };
    console.log("Saqlanayotgan sozlamalar:", allSettings);
    showTemporaryToast("✅ Barcha o'zgarishlar muvaffaqiyatli saqlandi!");
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
                onClick={openPasswordModal}
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
                onClick={handleToggleTwoFactor}
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

      {/* Toast xabar */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-up">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Parol o'zgartirish modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Parolni o'zgartirish</h3>
            </div>
            <div className="px-6 py-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yangi parol
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Kamida 6 ta belgi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {newPassword && newPassword.length < 6 && (
                <p className="mt-2 text-sm text-red-600">Parol kamida 6 ta belgidan iborat bo'lishi kerak.</p>
              )}
            </div>
            <div className="px-6 py-4 flex justify-end space-x-3 border-t">
              <button
                onClick={closePasswordModal}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSavePassword}
                disabled={newPassword.length < 6}
                className={`px-4 py-2 rounded-lg font-medium ${
                  newPassword.length < 6
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA modal */}
      {isTwoFactorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {security.twoFactorAuth ? "2FA ni o'chirish" : "2FA ni yoqish"}
              </h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-700">
                {security.twoFactorAuth
                  ? "Ikki bosqichli autentifikatsiyani o'chirib yuborishni tasdiqlaysizmi?"
                  : "Ikki bosqichli autentifikatsiyani yoqishni tasdiqlaysizmi?"}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-end space-x-3 border-t">
              <button
                onClick={() => setIsTwoFactorModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmTwoFactorToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integratsiya modal */}
      {isIntegrationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {integrations[selectedIntegration]
                  ? `${selectedIntegration} ni uzish`
                  : `${selectedIntegration} ni ulash`}
              </h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-700">
                {integrations[selectedIntegration]
                  ? `${selectedIntegration} integratsiyasini uzishni tasdiqlaysizmi?`
                  : `${selectedIntegration} integratsiyasini ulashni tasdiqlaysizmi?`}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-end space-x-3 border-t">
              <button
                onClick={() => setIsIntegrationModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmIntegrationToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;