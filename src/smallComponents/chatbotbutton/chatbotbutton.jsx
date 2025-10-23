import React, { useState } from "react";
import { Client } from "@gradio/client";
import { TbMessageChatbot } from "react-icons/tb";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { id, role: 'user'|'assistant', content }
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const makeId = () =>
    Date.now().toString() + Math.random().toString(36).slice(2);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input; // preserve before clearing
    const userMsg = { id: makeId(), role: "user", content: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const client = await Client.connect("dhanu1401/chatbot");
      const chat_history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const payload = {
        message: userText,
        chat_history: chat_history.concat({ role: "user", content: userText }),
      };

      const result = await client.predict("/respond", payload);

      let assistantMsg = "Kechirasiz, javob olinmadi.";
      if (result && result.data && result.data[0]) {
        const r = result.data[0];
        if (typeof r === "string") {
          assistantMsg = r;
        } else if (Array.isArray(r) && r.length > 0) {
          const last = r[r.length - 1];
          if (last && last.role === "assistant") assistantMsg = last.content;
          else assistantMsg = JSON.stringify(r);
        } else if (typeof r === "object" && r.content) {
          assistantMsg = r.content;
        } else {
          assistantMsg = JSON.stringify(r);
        }
      }

      const botMsg = { id: makeId(), role: "assistant", content: assistantMsg };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error("Gradio client error:", e);
      const botMsg = {
        id: makeId(),
        role: "assistant",
        content: "Xatolik yuz berdi.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
      >
        <TbMessageChatbot style={{ color: "white", fontSize: "25px" }} />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden animate-fadeIn z-50">
          <div className="bg-blue-600 text-white text-center py-2 font-semibold">
            Chatbot
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 && (
              <div className="text-gray-400">Salom! Savolingizni yozing.</div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {typeof msg.content === "string"
                  ? msg.content
                  : msg.content && msg.content.content
                  ? msg.content.content
                  : JSON.stringify(msg.content)}
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={loading ? "Yuborilmoqda..." : "Xabar yozing..."}
              className="flex-1 p-2 outline-none"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3"
              disabled={loading}
            >
              {loading ? "..." : "➤"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;
