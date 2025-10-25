import { useEffect, useState } from "react";
import React from "react";
import useGet from "../../customHooks/useGet";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import mainLogo from "../welcomePage/img/mainLogoWel.png"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useGet("/users");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterUser = data.filter(
      (user) => user.username == username && user.password == password
    );
    console.log(filterUser);

    e.preventDefault();
    if (filterUser.length > 0) {
      const token =
        "fake-jwt-" + Math.random().toString(36).slice(2) + "-" + Date.now();
      localStorage.setItem("token", token);
      localStorage.setItem("userId", filterUser[0].id);
      toast.success("Successfully login");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else {
      toast.error("bunaqa user topilmadi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#071024] to-[#0b1020] p-6">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400 opacity-30 blur-3xl transform rotate-12"></div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-500 opacity-25 blur-3xl transform -rotate-6"></div>
      </div>
      <ToastContainer />
      <main className="w-full max-w-md p-6">
        <section className="bg-white/6 backdrop-blur-sm border border-white/8 rounded-3xl shadow-[0_10px_30px_rgba(2,6,23,0.6)] p-8">
            <div className="flex justify-center">
              <img className="w-[320px] h-[180px] " src={mainLogo} alt="" />
            </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 block w-full rounded-xl bg-white/6 border border-white/12 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 px-4 py-3 text-white"
                placeholder="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-xl bg-white/6 border border-white/12 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 px-4 py-3 pr-12 text-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-200/90 bg-white/4 px-2 py-1 rounded-md backdrop-blur"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
              >
                Sign in
              </button>
            </div>

            {msg && (
              <p
                className={`text-center text-sm mt-1 ${
                  msg.startsWith("Muvaffaqiyatli")
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {msg}
              </p>
            )}
          </form>

          <hr className="my-6 border-white/6" />
          <p className="text-xs text-slate-400 text-center">
            Test: <strong>admin</strong> / <strong>12345</strong>
          </p>
        </section>
      </main>

      {/* small footer */}
      <div className="absolute bottom-6 text-xs text-slate-400">
        © {new Date().getFullYear()} Your App
      </div>
    </div>
  );
}
