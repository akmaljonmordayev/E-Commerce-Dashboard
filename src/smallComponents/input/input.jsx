import React from "react";

function Input() {
  return <div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-4 py-2 rounded-lg border-2 outline-none text-sm transition-all"
      style={{
        borderColor: color,
      }}
      onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${color}55`)}
      onBlur={(e) => (e.target.style.boxShadow = "none")}
    />
  </div>;
}

export default Input;
