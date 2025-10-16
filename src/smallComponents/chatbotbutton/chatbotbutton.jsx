import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbMessageChatbot } from "react-icons/tb";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/commands").then((res) => setCommands(res.data));
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    
    const command = commands.find(
      (cmd) => cmd.command.toLowerCase() === input.toLowerCase()
    );

    const botMsg = command
      ? { sender: "bot", text: command.response }
      : { sender: "bot", text: "Kechirasiz, bu komanda topilmadi." };

    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
      >
        <TbMessageChatbot style={{color:"white", fontSize:"25px"}}/>
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden animate-fadeIn z-50">
          <div className="bg-blue-600 text-white text-center py-2 font-semibold">
            Chatbot
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Komanda yozing..."
              className="flex-1 p-2 outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;
