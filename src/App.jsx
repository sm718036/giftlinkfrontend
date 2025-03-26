import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import DetailsPage from "./pages/DetailsPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import MaintenancePage from './pages/MaintenancePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HomePage />
      </>
    ),
  },
  {
    path: "/app",
    element: (
      <>
        <Navbar />
        <MainPage />
      </>
    ),
  },
  {
    path: "/app/login",
    element: (
      <>
        <Navbar />
        <LoginPage />
      </>
    ),
  },
  {
    path: "/app/register",
    element: (
      <>
        <Navbar />
        <RegisterPage />
      </>
    ),
  },
  {
    path: "/app/product/:productId",
    element: (
      <>
        <Navbar />
        <DetailsPage />
      </>
    ),
  },
  {
    path: "/app/search",
    element: (
      <>
        <Navbar />
        <SearchPage />
      </>
    ),
  },
  {
    path: "/app/profile",
    element: (
      <>
        <Navbar />
        <ProfilePage />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      {/* <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} /> */}
      <MaintenancePage />
    </>
  );
}
export default App;
