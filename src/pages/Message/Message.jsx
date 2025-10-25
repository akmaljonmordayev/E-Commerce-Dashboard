import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Message() {
  const [topics, setTopics] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    fetchTopics();
  }, []);

  async function fetchTopics() {
    const res = await axios.get("http://localhost:5000/message");
    setTopics(res.data);
  }

  async function sendReply() {
    if (!newMsg || !activeChat) return;
    const updatedChat = {
      ...activeChat,
      messages: [
        ...activeChat.messages,
        { from: "admin", text: newMsg, time: new Date().toLocaleString() },
      ],
    };
    await axios.put(`http://localhost:5000/message/${activeChat.id}`, updatedChat);
    setActiveChat(updatedChat);
    setNewMsg("");
  }

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      <div className="border rounded-xl p-4 h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">📋 Mavzular</h2>
        {topics.map((t) => (
          <div
            key={t.id}
            onClick={() => setActiveChat(t)}
            className={`p-3 mb-2 rounded cursor-pointer ${
              activeChat?.id === t.id ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <p className="font-semibold">{t.topic}</p>
            <p className="text-sm text-gray-500">@{t.username}</p>
          </div>
        ))}
      </div>

      <div className="col-span-2 border rounded-xl flex flex-col p-4">
        {activeChat ? (
          <>
            <h2 className="text-lg font-bold mb-2">{activeChat.topic}</h2>
            <div className="flex-1 overflow-y-auto mb-3 p-3 bg-gray-50 rounded-xl">
              {activeChat.messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-2 ${
                    m.from === "admin" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      m.from === "admin"
                        ? "bg-blue-200"
                        : "bg-gray-200"
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="text-xs text-gray-500">{m.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="flex-1 border rounded-lg p-2"
                placeholder="Javob yozish..."
              />
              <button
                onClick={sendReply}
                className="bg-blue-500 text-white px-4 rounded-lg"
              >
                Yuborish
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 m-auto">Mavzuni tanlang 👈</p>
        )}
      </div>
    </div>
  );
}
