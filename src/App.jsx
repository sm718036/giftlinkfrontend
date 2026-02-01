import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DetailsPage from "./pages/DetailsPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "/search",
        element: <SearchPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/gift/:giftId",
            element: <DetailsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
export default App;
