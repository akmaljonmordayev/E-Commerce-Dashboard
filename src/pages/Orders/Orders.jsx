import React from "react";
import CustomTable from "../Products/customTable";
import useGet from "../../customHooks/useGet";
import useDelete from "../../customHooks/useDelete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
  const { data } = useGet("/orders");
  const { deleteData } = useDelete("/orders");

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Pending":
        return "text-yellow-500";
      case "Shipped":
        return "text-blue-600";
      default:
        return "text-red-600";
    }
  };

  return (
    <div className="p-6 flex justify-center bg-[#1e2940] min-h-screen">
      <div className="w-full max-w-5xl bg-[#1e2940] rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Orders</h2>
        </div>

        <table className="w-full text-left border-collapse bg-white shadow-xl rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800 text-sm font-semibold uppercase tracking-wide">
              <th className="p-3">Status</th>
              <th className="p-3">Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((order) => (
                <tr
                  key={order.id}
                  className="transition duration-300 hover:bg-gray-50"
                >
                  <td
                    className={`p-3 font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </td>
                  <td className="p-3 text-gray-700">{order.name}</td>
                  <td className="p-3 text-gray-700">{order.createdAt}</td>
                  <td className="p-3 text-gray-800 font-medium">
                    ${order.totalAmount}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => {
                        deleteData(order.id);
                        toast.success("Order deleted!");
                      }}
                      className="px-3 py-1 rounded bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Orders;