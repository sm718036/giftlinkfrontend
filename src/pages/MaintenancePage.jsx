import React from "react";

const MaintenancePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-center p-5">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Sorry for the Inconvenience
        </h1>
        <p className="text-gray-600 mb-4">
          We are working hard to add some new features. We will be back soon.
        </p>
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-yellow-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
        <p className="text-gray-600 text-sm">
          If you have any queries, feel free to contact us:
          <br />
          <strong>Email:</strong> sm718036@gmail.com
          <br />
          <strong>WhatsApp:</strong> +92315-7496037
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;