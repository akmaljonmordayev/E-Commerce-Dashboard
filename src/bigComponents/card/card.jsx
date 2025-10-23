import React from "react";

function Card() {
  return (
    <div className="flex gap-6 justify-center items-center py-10">
      {cards.map((text, i) => (
        <div
          key={i}
          className="w-[255px] h-[120px] bg-black text-white flex items-center justify-center rounded-2xl shadow-md border border-gray-700 opacity-100"
        >
          <span className="text-lg font-medium select-none">{text}</span>
        </div>
      ))}
    </div>
  );
}

export default Card;
