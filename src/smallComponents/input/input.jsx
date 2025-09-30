import React from "react";

function Input() {

  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
        w-[300px] 
        px-3 py-2 
        border-[3px] border-gray-300 
        rounded-lg 
        text-sm 
        outline-none 
        transition 
        focus:border-green-300 
        focus:shadow-[0_0_0_2px_rgba(14,165,164,0.2)]
      "
        style={{
          borderColor: color,
        }}
        onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${color}55`)}
        onBlur={(e) => (e.target.style.boxShadow = "none")}
      />
    </div>
  );
}

export default Input;
