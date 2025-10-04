import React from "react";
export default function ProductCard({ title, count }) {
  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6 w-[300px] h-[150px]">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{count}</h2>
    </div>
  );
}
