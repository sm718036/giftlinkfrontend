import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSearchGifts } from "../hooks/giftHooks";
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from "../hooks/wishlistHooks";
import { useAppContext } from "../context/AuthContext";
import GiftCard from "../components/GiftCard";
import { Pagination } from "../components/Pagination";
import Loader from "../components/Loader";
export default function SearchPage() {
  const { user } = useAppContext();
  const logged = !!user?.email;
  const { wishlistIds } = useWishlist(logged);
  const { addToWishlist } = useAddToWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    ageInYears: 6,
    name: "",
  });
  const [debounced, setDebounced] = useState(filters);
  const [pagination, setPagination] = useState({ currentPage: 1, limit: 10 });
  const { foundGifts, isFindingGifts, errorInFindingGifts, paginationMeta } = useSearchGifts({
    ...debounced,
    ...pagination,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(filters);
      setPagination((p) => ({ ...p, currentPage: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);
  const set = (key, value) => setFilters((p) => ({ ...p, [key]: value }));
  const resetFilters = () => setFilters({ category: "", condition: "", ageInYears: 6, name: "" });
  const hasActiveFilters = Boolean(
    filters.category || filters.condition || filters.name || Number(filters.ageInYears) !== 6
  );
  const add = async (id) => {
    try {
      await addToWishlist(id);
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error(error);
    }
  };
  const remove = async (id) => {
    try {
      await removeFromWishlist(id);
      toast.success("Removed from wishlist.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="page-section">
      <div className="page-wrap">
        <h1 className="section-title">
          Find something
          <br />
          <span className="display-serif text-[#047669]">worth giving a new story.</span>
        </h1>
        <p className="section-copy">Search nearby gifts by name, room, condition, or age.</p>
        <section
          aria-label="Gift filters"
          className="mt-8 mb-9 flex flex-col gap-2.5 rounded-[24px] border border-[#102a24]/10 bg-[#fffdfa]/70 p-2.5 backdrop-blur-sm sm:flex-row sm:items-center"
        >
          <div className="relative flex flex-1 items-center">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#61746d]"
            />
            <input
              aria-label="Search gifts by name"
              className="field !h-11 !min-h-11 !rounded-full !border-transparent !bg-[#f4ece5] !py-0 !pl-11 !pr-10"
              placeholder="Search by name — bookshelf, lamp…"
              value={filters.name}
              onChange={(e) => set("name", e.target.value)}
            />
            {filters.name && (
              <button
                type="button"
                onClick={() => set("name", "")}
                aria-label="Clear search text"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#61746d] transition hover:bg-[#e7dcd2] hover:text-[#102a24]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:contents">
            <select
              aria-label="Category"
              className="field !h-11 !min-h-11 !rounded-full !bg-[#fffdfa] !py-0 sm:!w-auto"
              value={filters.category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="">All categories</option>
              {["Living", "Bedroom", "Bathroom", "Kitchen", "Office"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <select
              aria-label="Condition"
              className="field !h-11 !min-h-11 !rounded-full !bg-[#fffdfa] !py-0 sm:!w-auto"
              value={filters.condition}
              onChange={(e) => set("condition", e.target.value)}
            >
              <option value="">Any condition</option>
              {["New", "Like New", "Older"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="flex h-11 items-center gap-3 rounded-full border border-[#102a24]/15 bg-[#fffdfa] px-4">
            <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[.1em] text-[#52665f]">
              Up to {filters.ageInYears} {Number(filters.ageInYears) === 1 ? "yr" : "yrs"}
            </span>
            <input
              aria-label="Maximum age in years"
              type="range"
              className="w-full sm:w-24"
              min="1"
              max="10"
              value={filters.ageInYears}
              onChange={(e) => set("ageInYears", e.target.value)}
            />
          </div>
        </section>

        {hasActiveFilters && (
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#102a24]/15 bg-[#fffdfa] px-3 py-1.5 text-xs font-bold text-[#035954] transition hover:bg-[#f2e9e2]"
            >
              <X size={12} /> Clear filters
            </button>
          </div>
        )}
        {isFindingGifts ? (
          <Loader />
        ) : errorInFindingGifts ? (
          <div className="surface p-8 text-center text-red-800">
            Failed to load gifts. Please try again.
          </div>
        ) : foundGifts?.length ? (
          <>
            <div className="mb-5 text-sm text-[#61746d]">
              Showing {foundGifts.length} available {foundGifts.length === 1 ? "gift" : "gifts"}
            </div>
            <div className="gift-grid">
              {foundGifts.map((g) => (
                <GiftCard
                  key={g._id ?? g.id}
                  giftData={{
                    ...g,
                    date_added: g.createdAt
                      ? Math.floor(new Date(g.createdAt).getTime() / 1000)
                      : g.date_added,
                  }}
                  showWishlistButton={logged}
                  isInWishlist={wishlistIds.includes(g._id)}
                  onAddToWishlist={add}
                  onRemoveFromWishlist={remove}
                />
              ))}
            </div>
            <Pagination
              totalPages={paginationMeta?.totalPages}
              currentPage={pagination.currentPage}
              onPageChange={(currentPage) => setPagination((p) => ({ ...p, currentPage }))}
            />
          </>
        ) : (
          <div className="surface p-12 text-center">
            <h2 className="font-serif text-2xl">No matches just yet.</h2>
            <p className="mt-2 text-[#61746d]">
              Try broadening your filters or searching another name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
