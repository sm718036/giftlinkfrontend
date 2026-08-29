import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
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
          <span className="display-serif text-[#08704c]">worth giving a new story.</span>
        </h1>
        <p className="section-copy">Search nearby gifts by name, room, condition, or age.</p>
        <section className="surface my-10 p-5 md:p-7" aria-label="Gift filters">
          <div className="grid gap-4 md:grid-cols-4">
            <label className="form-label">
              Category
              <select
                className="field mt-2"
                value={filters.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">All categories</option>
                {["Living", "Bedroom", "Bathroom", "Kitchen", "Office"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="form-label">
              Condition
              <select
                className="field mt-2"
                value={filters.condition}
                onChange={(e) => set("condition", e.target.value)}
              >
                <option value="">Any condition</option>
                {["New", "Like New", "Older"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="form-label">
              Maximum age: {filters.ageInYears} years
              <input
                type="range"
                className="mt-5 w-full"
                min="1"
                max="10"
                value={filters.ageInYears}
                onChange={(e) => set("ageInYears", e.target.value)}
              />
            </label>
            <label className="form-label">
              Search by name
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3.5 text-[#627168]" size={18} />
                <input
                  className="field !pl-10"
                  placeholder="Bookshelf, lamp…"
                  value={filters.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
            </label>
          </div>
        </section>
        {isFindingGifts ? (
          <Loader />
        ) : errorInFindingGifts ? (
          <div className="surface p-8 text-center text-red-800">
            Failed to load gifts. Please try again.
          </div>
        ) : foundGifts?.length ? (
          <>
            <div className="mb-5 text-sm text-[#627168]">
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
            <p className="mt-2 text-[#627168]">
              Try broadening your filters or searching another name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
