import { MessageCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function Message({ darkMode }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      // const res = await fetch("https://yourserver.com/api/messages"); // <--- backend API manzilingiz
      const data = await res.json();
      setMessages(data.reverse());
    } catch (err) {
      console.error("Xabarlarni olishda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 py-16 animate-pulse">
        <MessageCircle size={40} className="mb-3 text-blue-500" />
        <p>Ma'lumotlar yuklanmoqda...</p>
      </div>
    );

  if (!messages.length)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <MessageCircle size={48} className="mb-3 text-blue-400/50" />
        <p>Hozircha xabarlar yo‘q.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {messages.map((msg) => (
        <div
          key={msg.id || msg.time}
          className={`p-5 rounded-2xl border shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${
            darkMode
              ? "bg-slate-700/60 border-slate-600 text-gray-100"
              : "bg-white border-gray-100 text-gray-800"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg truncate">
              @{msg.username || "Noma’lum"}
            </h2>
            <span className="text-xs opacity-60">
              {new Date(msg.time).toLocaleString()}
            </span>
          </div>
          <p className="leading-relaxed">{msg.text}</p>
        </div>
      ))}
    </div>
  );
}


;
