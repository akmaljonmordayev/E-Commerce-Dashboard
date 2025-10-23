import React from "react";
import useGet from "../../customHooks/useGet";

function OrdersArchive() {
  const { data } = useGet("/order");

  return (
    <div className="p-8 bg-[#1b2335] min-h-screen flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#1b2335]">Archived Orders</h2>
        <table className="w-full text-left text-gray-800">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase border-b">
            <tr>
              <th className="p-3 font-semibold">ID</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{order.name}</td>
                <td className="p-3">{order.createdAt}</td>
                <td className="p-3">${order.totalAmount}</td>
              </tr>
            ))}

            {data?.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500 italic">
                  No archived orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersArchive;
