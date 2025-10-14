import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [commands, setCommands] = useState([]);
  const [newCommand, setNewCommand] = useState("");
  const [newResponse, setNewResponse] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/commands").then((res) => setCommands(res.data));
  }, []);

  const addCommand = async () => {
    if (!newCommand.trim() || !newResponse.trim()) return;
    const res = await axios.post("http://localhost:5000/commands", {
      command: newCommand,
      response: newResponse,
    });
    setCommands([...commands, res.data]);
    setNewCommand("");
    setNewResponse("");
  };

  const deleteCommand = async (id) => {
    await axios.delete(`http://localhost:5000/commands/${id}`);
    setCommands(commands.filter((cmd) => cmd.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Chatbot Komandalar</h1>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Komanda..."
          value={newCommand}
          onChange={(e) => setNewCommand(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Javob..."
          value={newResponse}
          onChange={(e) => setNewResponse(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={addCommand}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Qo‘shish
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Komanda</th>
            <th className="border p-2 text-left">Javob</th>
            <th className="border p-2 text-center">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((cmd) => (
            <tr key={cmd.id} className="border-t">
              <td className="p-2">{cmd.command}</td>
              <td className="p-2">{cmd.response}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => deleteCommand(cmd.id)}
                  className="text-red-600 hover:underline"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Chatbot;
