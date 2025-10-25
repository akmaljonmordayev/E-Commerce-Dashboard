
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsersArchieve() {
  const [archivedUsers, setArchivedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchArchivedUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/usersArchieve");
        setArchivedUsers(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("❌ Arxivlangan foydalanuvchilarni yuklab bo'lmadi!");
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedUsers();
  }, []);

  const filtered = archivedUsers.filter(
    (user) =>
      (user.username && user.username.toLowerCase().includes(search.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.surname && user.surname.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="p-6 text-white">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">🗂️ Arxivlangan Foydalanuvchilar</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 bg-[#25314d] text-white rounded border border-gray-600"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400">Arxivda foydalanuvchi topilmadi.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#25314d] rounded">
            <thead>
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Ism</th>
                <th className="p-3 text-left">Familiya</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">O'chirilgan sana</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-t border-gray-700">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.surname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    {user.deletedAt
                      ? new Date(user.deletedAt).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersArchieve;