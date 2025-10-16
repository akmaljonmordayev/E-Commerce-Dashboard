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
    const colors = {
      Completed: "text-green-600",
      Pending: "text-yellow-500",
      Shipped: "text-blue-600",
    };
    return colors[status] || "text-red-600";
  };

  const handleDelete = (id) => {
    deleteData(id);
    toast.success("Order deleted!");
  };

  return (
    <div className="p-6 flex justify-center bg-[#1e2940] min-h-screen">
      <div className="w-full max-w-5xl bg-[#1e2940] rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-semibold tracking-wide">
            Orders
          </h2>
        </div>

        <div className="overflow-hidden rounded-lg shadow-2xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-4 text-sm font-semibold uppercase text-gray-700 tracking-wider">
                  Status
                </th>
                <th className="p-4 text-sm font-semibold uppercase text-gray-700 tracking-wider">
                  Name
                </th>
                <th className="p-4 text-sm font-semibold uppercase text-gray-700 tracking-wider">
                  Date
                </th>
                <th className="p-4 text-sm font-semibold uppercase text-gray-700 tracking-wider">
                  Total Amount
                </th>
                <th className="p-4 text-sm font-semibold uppercase text-center text-gray-700 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((order) => (
                <tr
                  key={order.id}
                  className="transition duration-200 hover:bg-gray-50 hover:-translate-y-[1px]"
                >
                  <td className={`p-4 font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="p-4 text-gray-700">{order.name}</td>
                  <td className="p-4 text-gray-700">{order.createdAt}</td>
                  <td className="p-4 text-gray-800 font-medium">
                    ${order.totalAmount}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="px-3 py-1 rounded bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all shadow-sm hover:shadow-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {data?.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-gray-500 italic"
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
