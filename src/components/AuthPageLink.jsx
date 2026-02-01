import React from "react";
import { Link } from "react-router-dom";

const AuthPageLink = ({ label, linkText, path }) => {
  return (
    <p className="mt-4 text-center text-gray-600">
      {label}
      <Link className="text-blue-500 hover:underline" to={path}>
        <span> {linkText}</span>
      </Link>
    </p>
  );
};

export default AuthPageLink;
