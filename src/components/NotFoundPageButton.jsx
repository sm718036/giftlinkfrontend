import React from "react";

const darkButton = "bg-slate-800 text-white hover:bg-slate-700";
const lightButton =
  "bg-white text-slate-800 hover:bg-slate-50 border-2 border-slate-300";

const NotFoundPageButton = ({ onClick, variant = "light", label }) => {
  const buttonVariant = variant === "light" ? lightButton : darkButton;
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto cursor-pointer ${buttonVariant}`}
    >
      {label}
    </button>
  );
};

export default NotFoundPageButton;
