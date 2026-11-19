import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";

const navClass = ({ isActive }) =>
  `text-sm transition ${isActive ? "font-bold text-[#035954]" : "text-[#52665f] hover:text-[#035954]"}`;
export default function Navbar() {
  const { user, setHasToken } = useAppContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    queryClient.clear();
    setHasToken(false);
    close();
    toast.success("You have successfully logged out.");
    navigate("/");
  };

  if (["/login", "/register"].includes(pathname)) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#102a24]/15 bg-[#fcf8f5]/95 backdrop-blur-lg">
      <nav
        className="page-wrap flex min-h-[76px] items-center justify-between gap-6"
        aria-label="Primary navigation"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-xl font-semibold tracking-[-.04em]"
          onClick={close}
          aria-label="GiftLink home"
        >
          <img
            src="/static/logo-mark.png"
            alt=""
            width="44"
            height="38"
            className="h-10 w-auto shrink-0 rounded-md"
          />
          <span className="text-[#035954]">
            Gift<span className="text-[#c9610a]">Link</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          <NavLink to="/" end className={navClass}>
            Gifts
          </NavLink>
          <NavLink to="/search" className={navClass}>
            Discover
          </NavLink>
          {user?.email && (
            <>
              <NavLink to="/giveaways" className={navClass}>
                My giveaways
              </NavLink>
              <NavLink to="/wishlist" className={navClass}>
                Wishlist
              </NavLink>
            </>
          )}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {user?.email ? (
            <>
              <Link to="/profile" className="btn-secondary !min-h-[42px] !py-2">
                Profile
              </Link>
              <button onClick={handleLogout} className="btn-primary !min-h-[42px] !py-2">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold">
                Log in
              </Link>
              <Link to="/register" className="btn-primary !min-h-[42px] !py-2">
                Join GiftLink
              </Link>
            </>
          )}
        </div>
        <button
          type="button"
          className="icon-button nav-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {menuOpen && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-76px)] overflow-y-auto border-t border-[#102a24]/15 bg-[#fffdfa] px-4 py-5 shadow-[0_18px_40px_rgba(4,42,34,.16)] md:hidden">
          <div className="page-wrap flex flex-col gap-4">
            <NavLink to="/" onClick={close} className={navClass}>
              Gifts
            </NavLink>
            <NavLink to="/search" onClick={close} className={navClass}>
              Discover
            </NavLink>
            {user?.email ? (
              <>
                <NavLink to="/giveaways" onClick={close} className={navClass}>
                  My giveaways
                </NavLink>
                <NavLink to="/wishlist" onClick={close} className={navClass}>
                  Wishlist
                </NavLink>
                <NavLink to="/profile" onClick={close} className={navClass}>
                  Profile
                </NavLink>
                <button onClick={handleLogout} className="btn-primary mt-2">
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={close} className={navClass}>
                  Log in
                </NavLink>
                <Link to="/register" onClick={close} className="btn-primary mt-2">
                  Join GiftLink
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
