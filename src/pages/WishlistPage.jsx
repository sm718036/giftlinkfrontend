import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist, useRemoveFromWishlist } from "../hooks/wishlistHooks";
import GiftCard from "../components/GiftCard";
import Loader from "../components/Loader";
export default function WishlistPage() {
  const { wishlistGifts, isLoadingWishlist, errorInGettingWishlist } = useWishlist();
  const { removeFromWishlist, isRemovingFromWishlist } = useRemoveFromWishlist();
  const remove = async (giftId, giftName) => {
    try {
      await removeFromWishlist(giftId);
      toast.success(`"${giftName}" removed from wishlist.`);
    } catch (error) {
      console.error(error);
    }
  };
  const card = (g) => ({
    ...g,
    date_added: g.createdAt ? Math.floor(new Date(g.createdAt).getTime() / 1000) : null,
  });
  return (
    <div className="page-section">
      <div className="page-wrap">
        <h1 className="section-title">
          My <span className="display-serif text-[#08704c]">wishlist.</span>
        </h1>
        <p className="section-copy">A thoughtful shortlist of items you may be able to use.</p>
        <div className="mt-10">
          {isLoadingWishlist ? (
            <Loader />
          ) : errorInGettingWishlist ? (
            <div className="surface p-8 text-center text-red-800">
              {errorInGettingWishlist.message || "Failed to load your wishlist."}
            </div>
          ) : wishlistGifts?.length ? (
            <div className="gift-grid">
              {wishlistGifts.map((g) => (
                <div key={g._id}>
                  <GiftCard giftData={card(g)} />
                  <button
                    type="button"
                    onClick={() => remove(g._id, g.name)}
                    disabled={isRemovingFromWishlist}
                    className="btn-secondary mt-3 w-full"
                  >
                    Remove from wishlist
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="surface p-12 text-center">
              <h2 className="font-serif text-2xl">Your wishlist is wide open.</h2>
              <p className="mt-2 text-[#627168]">Save gifts you love and find them here later.</p>
              <Link to="/search" className="btn-primary mt-6">
                <Search size={17} /> Discover gifts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
