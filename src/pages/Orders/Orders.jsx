import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGet from "../../customHooks/useGet";
import useDelete from "../../customHooks/useDelete";

function Orders() {
  const { data } = useGet("/orders");
  const { deleteData } = useDelete("/orders");

  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let result = data || [];

    if (filterStatus !== "All") {
      result = result.filter(
        (order) => order.status?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (query.trim() !== "") {
      const q = query.toLowerCase();
      result = result.filter(
        (order) =>
          order.name?.toLowerCase().includes(q) ||
          order.status?.toLowerCase().includes(q) ||
          order.id?.toString().includes(q)
      );
    }

    setFilteredData(result);
  }, [query, filterStatus, data]);

  const handleDelete = (id) => {
    deleteData(id);
    toast.success("Order deleted!");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "shipped":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-8 bg-[#1b2335] min-h-screen flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Orders</h2>

          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search for order..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-lg bg-[#0f172a] !text-white
                         placeholder-gray-400 border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition duration-200"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition duration-200"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-left text-gray-800">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase border-b">
              <tr>
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Total</th>
                <th className="p-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredData?.map((order, index) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.createdAt}</td>
                  <td className="p-3">${order.totalAmount}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-500 hover:bg-red-600 transition p-2 rounded-md text-white"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredData?.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    No orders found.
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

export default Orders;
