

import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../customHooks/useGet";
import useDelete from "../../customHooks/useDelete";
import usePost from "../../customHooks/usePost";

function UsersArchieve() {
  const { data, refetch } = useGet("/usersArchieve");
  const { deleteData } = useDelete("/usersArchieve");
  const { postData } = usePost("/users");

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let result = data || [];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (user) =>
          (user.username && user.username.toLowerCase().includes(q)) ||
          (user.email && user.email.toLowerCase().includes(q)) ||
          (user.name && user.name.toLowerCase().includes(q)) ||
          (user.surname && user.surname.toLowerCase().includes(q))
      );
    }

    setFilteredData(result);
  }, [search, data]);

  const handleRestore = async (id) => {
    try {
      const userToRestore = data.find((u) => u.id === id);
      if (!userToRestore) return toast.error("Foydalanuvchi topilmadi!");

     
      const { id: _, deletedAt, ...userData } = userToRestore;
      await postData(userData);
      await deleteData(id); 

      refetch();
      toast.success("✅ Foydalanuvchi arxivdan tiklandi!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Tiklab bo'lmadi!");
    }
  };

  return (
    <div className="p-8 bg-[#1b2335] min-h-screen flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Archived Users</h2>

          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search archived user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-lg bg-[#0f172a] text-white
                         placeholder-gray-400 border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition duration-200"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-left text-gray-800">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase border-b">
              <tr>
                <th className="p-3 font-semibold">#</th>
                <th className="p-3 font-semibold">Username</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Surname</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold">Deleted At</th>
                <th className="p-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredData?.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{user.username}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.surname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 text-sm text-gray-500">
                    {user.deletedAt
                      ? new Date(user.deletedAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleRestore(user.id)}
                      className="bg-purple-500 hover:bg-purple-600 transition p-2 rounded-md text-white"
                      title="Restore User"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredData?.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    No archived users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default UsersArchieve;