import React, { useState } from "react";
import { Client } from "@gradio/client";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = {
      role: "user",
      content: input,
      metadata: { title: null },
      options: null,
    };
    const chat_history = [
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        metadata: { title: null },
        options: null,
      })),
      userMessage,
    ];
    try {
      const client = await Client.connect("dhanu1401/chatbot");
      const result = await client.predict("/respond", {
        message: input,
        chat_history: messages
          .map((msg) => ({
            role: msg.role,
            content: msg.content,
            metadata: { title: null },
            options: null,
          }))
          .concat({
            role: "user",
            content: input,
            metadata: { title: null },
            options: null,
          }),
      });
      let assistantMsg = "No response";
      if (result && result.data && result.data[0]) {
        if (typeof result.data[0] === "string") {
          assistantMsg = result.data[0];
        } else if (
          typeof result.data[0] === "object" &&
          Array.isArray(result.data[0]) &&
          result.data[0].length > 0 &&
          result.data[0][result.data[0].length - 1].role === "assistant"
        ) {
          assistantMsg = result.data[0][result.data[0].length - 1].content;
        } else if (
          typeof result.data[0] === "object" &&
          result.data[0].content
        ) {
          assistantMsg = result.data[0].content;
        } else {
          assistantMsg = JSON.stringify(result.data[0]);
        }
      }
      setMessages([
        ...messages,
        { role: "user", content: input },
        { role: "assistant", content: assistantMsg },
      ]);
      setInput("");
    } catch (e) {
      setMessages([
        ...messages,
        { role: "user", content: input },
        { role: "assistant", content: "Xatolik yuz berdi." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">AI Chatbot</h1>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-white mb-4">
        {messages.length === 0 && (
          <div className="text-gray-400">   </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {typeof msg.content === "string"
                ? msg.content
                : msg.content && msg.content.content
                ? msg.content.content
                : JSON.stringify(msg.content)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Xabaringizni yozing..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 rounded w-full"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Yuborilmoqda..." : "Yuborish"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
