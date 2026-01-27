import React from "react";
import { useNavigate } from "react-router-dom";
import NotFoundPageButton from "../components/NotFoundPageButton";

const NotFoundPage = () => {
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/app");
  }
  function goBack() {
    window.history.back();
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-800 tracking-tight">
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-slate-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-slate-500">
            It might have been moved or deleted, or perhaps you mistyped the
            URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NotFoundPageButton
            onClick={navigateToHome}
            variant="dark"
            label="Go Home"
          />
          <NotFoundPageButton onClick={goBack} label="Go Back" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
