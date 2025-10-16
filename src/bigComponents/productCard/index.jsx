import React from "react";
export default function ProductCard({
  title,
  count,
  width = 350,
  height = 200,
}) {
  return (
    <div
      style={{ width: width, height: height }}
      className="bg-slate-900 text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center
                transition-transform transform hover:scale-105 hover:s  hadow-2xl"
    >
      <p className="text-[25px] text-slate-400">{title}</p>
      <h2 className="text-[50px] font-bold mt-2">{count}</h2>
    </div>
  );
}
