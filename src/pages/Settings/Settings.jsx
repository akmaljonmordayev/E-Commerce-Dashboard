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

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState("");

  const [toast, setToast] = useState({ show: false, message: "" });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
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
    showToast("Parol muvaffaqiyatli o'zgartirildi!");
    closePasswordModal();
  };

  const handleToggleTwoFactor = () => {
    setIsTwoFactorModalOpen(true);
  };

  const confirmTwoFactorToggle = () => {
    setSecurity((prev) => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
    showToast("2FA sozlamalari yangilandi!");
    setIsTwoFactorModalOpen(false);
  };

  const toggleIntegration = (service) => {
    setSelectedIntegration(service);
    setIsIntegrationModalOpen(true);
  };

  const confirmIntegrationToggle = () => {
    setIntegrations((prev) => ({
      ...prev,
      [selectedIntegration]: !prev[selectedIntegration],
    }));
    showToast(`${selectedIntegration} integratsiyasi yangilandi!`);
    setIsIntegrationModalOpen(false);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleSave = () => {
    const allSettings = { profile, security, notifications, integrations };
    console.log("Saqlanayotgan sozlamalar:", allSettings);
    showToast("✅ Barcha o'zgarishlar muvaffaqiyatli saqlandi!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#0f172a] via-[#071024] to-[#0b1020] p-6 relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400 opacity-30 blur-3xl transform rotate-12"></div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-500 opacity-25 blur-3xl transform -rotate-6"></div>
      </div>

      <main className="w-full max-w-4xl mt-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white">Sozlamalar</h1>
          <p className="mt-2 text-slate-400">
            Hisobingizni sozlang, xavfsizlikni mustahkamlang va tajribangizni shaxsiylashtiring.
          </p>
        </div>

        <section className="bg-white/6 backdrop-blur-sm border border-white/8 rounded-3xl shadow-[0_10px_30px_rgba(2,6,23,0.6)] mb-8 p-6">
          <div className="mb-5 pb-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Profil sozlamalari</h2>
            <p className="text-slate-400 text-sm mt-1">
              Shaxsiy ma'lumotlarni tahrirlash, profil rasmini yuklash, parolni o'zgartirish.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">Ism va familiya</span>
              <span className="text-sm text-slate-200">{profile.fullName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">Elektron pochta</span>
              <span className="text-sm text-slate-200">{profile.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">Profil rasmi</span>
              <button className="text-sm text-indigo-300 hover:underline">Yuklash</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">Parolni o'zgartirish</span>
              <button
                onClick={openPasswordModal}
                className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
              >
                O'zgartirish
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white/6 backdrop-blur-sm border border-white/8 rounded-3xl shadow-[0_10px_30px_rgba(2,6,23,0.6)] mb-8 p-6">
          <div className="mb-5 pb-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Xavfsizlik sozlamalari</h2>
            <p className="text-slate-400 text-sm mt-1">
              Hisobingizni himoya qiling: 2FA, sessiyalar, xavfsizlik savollari.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">
                Ikki bosqichli autentifikatsiya (2FA)
              </span>
              <button
                onClick={handleToggleTwoFactor}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  security.twoFactorAuth ? "bg-indigo-500" : "bg-gray-500"
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
              <span className="text-sm font-medium text-slate-300">
                Qo'shimcha xavfsizlik savollari
              </span>
              <button className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
                Sozlash
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white/6 backdrop-blur-sm border border-white/8 rounded-3xl shadow-[0_10px_30px_rgba(2,6,23,0.6)] mb-8 p-6">
          <div className="mb-5 pb-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Bildirishnoma sozlamalari</h2>
            <p className="text-slate-400 text-sm mt-1">
              Har bir turdagi bildirishnomalarni alohida boshqaring.
            </p>
          </div>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-300">
                  {key === "email"
                    ? "Email orqali bildirishnomalar"
                    : key === "push"
                    ? "Push bildirishnomalar"
                    : "SMS xabarlar"}
                </span>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? "bg-indigo-500" : "bg-gray-500"
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
        </section>

        <section className="bg-white/6 backdrop-blur-sm border border-white/8 rounded-3xl shadow-[0_10px_30px_rgba(2,6,23,0.6)] mb-8 p-6">
          <div className="mb-5 pb-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Integratsiyalar</h2>
            <p className="text-slate-400 text-sm mt-1">
              Tashqi xizmatlarga ulanish va API boshqaruvi.
            </p>
          </div>
          <div className="space-y-4">
            {Object.entries(integrations).map(([service, connected]) => (
              <div key={service} className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-300">
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </span>
                <button
                  onClick={() => toggleIntegration(service)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    connected
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                  }`}
                >
                  {connected ? "Ulangan" : "Ulanmagan"}
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200"
          >
            O'zgarishlarni saqlash
          </button>
        </div>

        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Barcha o'zgarishlar saqlash tugmasini bosgandan so'ng qo'llaniladi.</p>
        </div>
      </main>

      {toast.show && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Parolni o'zgartirish</h3>
            </div>
            <div className="px-6 py-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Yangi parol
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Kamida 6 ta belgi"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {newPassword && newPassword.length < 6 && (
                <p className="mt-2 text-sm text-rose-400">Parol kamida 6 ta belgidan iborat bo'lishi kerak.</p>
              )}
            </div>
            <div className="px-6 py-4 flex justify-end space-x-3 border-t border-white/10">
              <button
                onClick={closePasswordModal}
                className="px-4 py-2 text-slate-300 hover:bg-white/5 rounded-lg font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSavePassword}
                disabled={newPassword.length < 6}
                className={`px-4 py-2 rounded-lg font-medium ${
                  newPassword.length < 6
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                }`}
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {isTwoFactorModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">
                {security.twoFactorAuth ? "2FA ni o'chirish" : "2FA ni yoqish"}
              </h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-slate-300">
                {security.twoFactorAuth
                  ? "Ikki bosqichli autentifikatsiyani o'chirib yuborishni tasdiqlaysizmi?"
                  : "Ikki bosqichli autentifikatsiyani yoqishni tasdiqlaysizmi?"}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-end space-x-3 border-t border-white/10">
              <button
                onClick={() => setIsTwoFactorModalOpen(false)}
                className="px-4 py-2 text-slate-300 hover:bg-white/5 rounded-lg font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmTwoFactorToggle}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-medium"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {isIntegrationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">
                {integrations[selectedIntegration]
                  ? `${selectedIntegration} ni uzish`
                  : `${selectedIntegration} ni ulash`}
              </h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-slate-300">
                {integrations[selectedIntegration]
                  ? `${selectedIntegration} integratsiyasini uzishni tasdiqlaysizmi?`
                  : `${selectedIntegration} integratsiyasini ulashni tasdiqlaysizmi?`}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-end space-x-3 border-t border-white/10">
              <button
                onClick={() => setIsIntegrationModalOpen(false)}
                className="px-4 py-2 text-slate-300 hover:bg-white/5 rounded-lg font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmIntegrationToggle}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-medium"
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