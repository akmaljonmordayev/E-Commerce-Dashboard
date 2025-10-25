import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "antd";
import { Github, Chrome } from "lucide-react";
import imageLogo from "../header/img/mainLogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import mainLogo from "./img/mainLogoWel.png"
export default function WelcomePage() {
  const [enter, setEnter] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handeLogin = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white relative overflow-hidden">
      <motion.div
        className="absolute w-[900px] h-[900px] bg-indigo-500/30 rounded-full blur-3xl -top-40 -left-40"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-purple-500/30 rounded-full blur-3xl -bottom-40 -right-40"
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <AnimatePresence>
        {!enter ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center z-10 p-6 text-center"
          >
              <img className="w-[380px] h-[260px]" src={mainLogo} alt="" />

            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
            >
              Welcome to Dashboard
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-xl mb-8 max-w-xl text-gray-200"
            >
              Explore powerful insights and unlock your potential 🚀
            </motion.p>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => setEnter(true)}
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 shadow-xl rounded-xl"
              >
                Enter Dashboard
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center z-10 p-6 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Sign in to Continue
            </h2>

            <div className="flex flex-col gap-4 w-72">
              <Button
                onClick={handeLogin}
                className="bg-red-500 w-[290px] hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md"
              >
                Login
              </Button>
              <Link to={"signup"}>
                <Button className="bg-blue-500 w-[290px] hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md">
                  Sign up
                </Button>
              </Link>
              <Button className="flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-200 py-3 px-6 rounded-lg font-semibold shadow-md">
                <Chrome className="w-5 h-5" /> Sign in with Google
              </Button>
              <Button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold shadow-md">
                <Github className="w-5 h-5" /> Sign in with GitHub
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
