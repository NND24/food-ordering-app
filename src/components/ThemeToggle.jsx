import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`
        relative flex items-center justify-between w-16 h-8 rounded-full p-1 transition-all duration-300 
        ${theme === "dark" ? "bg-gray-700" : "bg-yellow-400"}
      `}
    >
      <FaMoon
        className={`text-white text-sm transition-all duration-300 ${
          theme === "dark" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        }`}
      />
      <div
        className={`
          absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-all duration-300
          ${theme === "dark" ? "translate-x-8" : "translate-x-0"}
        `}
      ></div>
      <FaSun
        className={`text-white text-sm transition-all duration-300 ${
          theme === "light" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      />
    </button>
  );
}
