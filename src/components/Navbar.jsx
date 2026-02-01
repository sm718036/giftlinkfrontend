import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { user, setHasToken } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    queryClient.clear();
    setHasToken(false);
    toast.success("You have successfully logged out.");
    navigate(`/`);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg py-4 px-6 md:px-12 fixed w-full top-0 z-50 text-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold drop-shadow-lg">
          GiftLink
        </Link>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">
              Gifts
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-yellow-400 transition">
              Search
            </Link>
          </li>
        </ul>

        {/* User Section (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {user?.email ? (
            <>
              <span
                className="cursor-pointer hover:text-yellow-400 transition"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col items-center gap-4 mt-2 bg-white text-gray-800 shadow-lg p-4 rounded-md transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <Link
          to="/"
          className="block hover:text-indigo-600"
          onClick={() => setMenuOpen(false)}
        >
          Gifts
        </Link>
        <Link
          to="/search"
          className="block hover:text-indigo-600"
          onClick={() => setMenuOpen(false)}
        >
          Search
        </Link>

        {user?.email ? (
          <>
            <span
              className="block hover:text-indigo-600 transition"
              onClick={() => {
                navigate(`/profile`);
                setMenuOpen(false);
              }}
            >
              My Profile
            </span>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
