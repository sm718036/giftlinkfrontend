import { Link, useLocation } from "react-router-dom";
import { Gift, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { pathname } = useLocation();

  if (["/login", "/register"].includes(pathname)) return null;

  return (
    <footer className="bg-[#02271c] py-14 text-[#fffaf0]">
      <div className="page-wrap grid gap-10 md:grid-cols-[1.4fr_.6fr_.6fr] md:items-start">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-semibold">
            <Gift size={24} /> GiftLink
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#b9c8bf]">
            Good things deserve a second story. Share useful items with people nearby and keep
            generosity moving.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#dce92b]">
            Explore
          </p>
          <div className="flex flex-col gap-3 text-sm text-[#dbe4de]">
            <Link to="/">Available gifts</Link>
            <Link to="/search">Find a gift</Link>
            <Link to="/giveaways">Give something</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#dce92b]">
            Community
          </p>
          <Link to="/register" className="inline-flex items-center gap-1 text-sm text-[#dbe4de]">
            Join GiftLink <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="page-wrap mt-12 border-t border-white/15 pt-5 text-xs text-[#91a59a]">
        © {new Date().getFullYear()} GiftLink. Share more, waste less.
      </div>
    </footer>
  );
}
