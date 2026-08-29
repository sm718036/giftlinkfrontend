import React from "react";
import { Link } from "react-router-dom";

const AuthPageLink = ({ label, linkText, path }) => {
  return (
    <p className="mt-6 text-center text-sm text-[#627168]">
      {label}
      <Link className="font-bold text-[#063f2c] hover:underline" to={path}>
        <span> {linkText}</span>
      </Link>
    </p>
  );
};

export default AuthPageLink;
