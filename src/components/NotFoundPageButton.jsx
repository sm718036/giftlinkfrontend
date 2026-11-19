import React from "react";

const darkButton = "bg-[#04413b] text-[#fffdfa] hover:bg-[#035954]";
const lightButton =
  "bg-[#fffdfa] text-[#102a24] hover:bg-[#f2e9e2] border-2 border-[#102a24]/20";

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
