import React from "react";
export default function ProductCard({ title, count }) {
  return (
    <div
      className="bg-slate-900 text-white rounded-xl w-[350px] h-[200px] shadow-lg p-6 flex flex-col items-center justify-center
                transition-transform transform hover:scale-105 hover:s  hadow-2xl"
    >
      <p className="text-[35px] text-slate-400">{title}</p>
      <h2 className="text-[50px] font-bold mt-2">{count}</h2>
    </div>
  );
}
