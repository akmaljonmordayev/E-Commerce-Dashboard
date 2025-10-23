import React from "react";
import { Trash2, RotateCcw } from "lucide-react";
import useGet from "../../customHooks/useGet";
import useDelete from "../../customHooks/useDelete";
import usePost from "../../customHooks/usePost";
import { toast } from "react-toastify";

function Archive() {
  const { data } = useGet("/archive");
  const { deleteData } = useDelete("/archive");
  const { postData } = usePost("/orders");

  const handleRestore = async (order) => {
    await postData(order);
    await deleteData(order.id);
    toast.success("Order restored!");
  };

  return (
    <div className="p-8 bg-[#1b2335] min-h-screen flex justify-center">
      <div className="w-full max-w-6xl">
        <h2 className="text-white text-2xl font-bold mb-6">Archived Orders</h2>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-left text-gray-800">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase border-b">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.map((order, i) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.createdAt}</td>
                  <td className="p-3">${order.totalAmount}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleRestore(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      onClick={() => deleteData(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {data?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500 italic">
                    Archive is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Archive;
