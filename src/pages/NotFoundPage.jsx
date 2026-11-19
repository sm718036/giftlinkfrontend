import React from "react";
import { useNavigate } from "react-router-dom";
import NotFoundPageButton from "../components/NotFoundPageButton";

const NotFoundPage = () => {
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }
  function goBack() {
    window.history.back();
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fcf8f5] px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="display-serif text-9xl text-[#047669] tracking-tight">404</h1>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#102a24] mb-4">Page Not Found</h2>
          <p className="text-lg text-[#3d534c] mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-[#52665f]">
            It might have been moved or deleted, or perhaps you mistyped the URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NotFoundPageButton onClick={navigateToHome} variant="dark" label="Go Home" />
          <NotFoundPageButton onClick={goBack} label="Go Back" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
