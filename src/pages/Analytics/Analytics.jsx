import React from "react";
import useGet from "../../customHooks/useGet";
import BarChart from "../../bigComponents/ChartsComponents/BarChart";
import LineChart from "../../bigComponents/ChartsComponents/LineChart";
import PieChart from "../../bigComponents/ChartsComponents/PieChart";
import { GrBarChart } from "react-icons/gr";
import { FaCity } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
export default function Analytics() {
  
  const { data: customers = [] } = useGet("/customers");
  const { data: products = [] } = useGet("/products");
  const { data: orders = [] } = useGet("/orders");


  const cityData = customers.reduce((acc, c) => {
    const city = c?.address?.split(",")[0]?.trim() || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const cityLabels = Object.keys(cityData);
  const cityValues = Object.values(cityData);


  const categoryData = products.reduce((acc, p) => {
    const category = p?.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);


  const orderDates = orders.map((o) => o?.createdAt || "Unknown");
  const orderAmounts = orders.map((o) => Number(o?.totalAmount) || 0);


  const totalRevenue = orderAmounts.reduce((sum, val) => sum + val, 0);


  return (
    <div className="min-h-screen px-6 py-10">
      <h2 className="text-3xl font-semibold text-[#2a64f7] text-center mb-10 flex gap-[10px] items-center justify-center">
        <GrBarChart /> Analytics Dashboard
      </h2>


      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-5 border border-[#d7e4ff]">
          <h3 className="text-[#6f8ca9] text-sm mb-1">Customers</h3>
          <p className="text-3xl font-bold text-[#2a64f7]">{customers.length}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-[#d7e4ff]">
          <h3 className="text-[#6f8ca9] text-sm mb-1">Products</h3>
          <p className="text-3xl font-bold text-[#2a64f7]">{products.length}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-[#d7e4ff]">
          <h3 className="text-[#6f8ca9] text-sm mb-1">Orders</h3>
          <p className="text-3xl font-bold text-[#2a64f7]">{orders.length}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-[#d7e4ff]">
          <h3 className="text-[#6f8ca9] text-sm mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-[#2a64f7]">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-[#d7e4ff] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-medium text-[#2a64f7] mb-4 text-center flex items-center justify-center gap-[10px]">
            <FaCity /> Customers by City
          </h3>
          <PieChart
            labels={cityLabels}
            values={cityValues}
            colors={["#2a64f7", "#6f8ca9", "#7fa0c0", "#9fb9d3", "#c2d8f0"]}
            label="Cities"
          />
        </div>

        <div className="bg-white border border-[#d7e4ff] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-medium text-[#2a64f7] mb-4 text-center flex items-center justify-center gap-[10px]">
            <FaShoppingCart /> Products by Category
          </h3>
          <BarChart
            labels={categoryLabels}
            values={categoryValues}
            colors={["#2a64f7", "#6f8ca9", "#a1b8d4", "#c5dbfa"]}
            label="Categories"
          />
        </div>

        <div className="md:col-span-2 bg-white border border-[#d7e4ff] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-medium text-[#2a64f7] mb-4 text-center flex items-center justify-center gap-[10px]">
            <FaCalendarAlt /> Orders Over Time
          </h3>
          <LineChart
            labels={orderDates}
            values={orderAmounts}
            borderColor="#2a64f7"
            backgroundColor="rgba(42,100,247,0.2)"
            label="Order Amounts"
          />
        </div>
      </div>
    </div>
    
  );
}
 