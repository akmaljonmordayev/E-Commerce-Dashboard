import React from "react";

export default function AdminLogo({ variant = "full", onClick }) {
  return (
    <button className="admin-logo" onClick={onClick}>
      <svg
        className="admin-logo__icon"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#13ecc8" />
            <stop offset="100%" stopColor="#0a9e8f" />
          </linearGradient>
        </defs>
        <path
          d="M32 4 L56 12 V30 C56 46 43 58 32 60 C21 58 8 46 8 30 V12 Z"
          fill="url(#g1)"
        />
      </svg>

      {variant === "full" && (
        <div className="admin-logo__text">
          <span className="admin-logo__title">AdminForge</span>
          <span className="admin-logo__subtitle">Control panel</span>
        </div>
      )}
    </button>
  );
}
