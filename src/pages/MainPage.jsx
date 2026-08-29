import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useGetAllGifts } from "../hooks/giftHooks";
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from "../hooks/wishlistHooks";
import { useAppContext } from "../context/AuthContext";
import GiftCard from "../components/GiftCard";
import Loader from "../components/Loader";
import { Pagination } from "../components/Pagination";
export default function MainPage() {
  const [paginationParams, setPaginationParams] = useState({
    currentPage: 1,
    limit: 10,
  });
  const { allGifts, isLoadingAllGifts, errorInGettingAllGifts, paginationMeta } =
    useGetAllGifts(paginationParams);
  const { user, isLoadingUser } = useAppContext();
  const isLoggedIn = !!user?.email;
  const { wishlistIds } = useWishlist(isLoggedIn);
  const { addToWishlist } = useAddToWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();
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
    <>
      <section className="hero">
        <div className="page-wrap hero-grid">
          <div>
            <h1>
              Pass it on.
              <em className="display-serif">Make someone&apos;s day.</em>
            </h1>
            <p className="section-copy !mt-6">
              GiftLink connects useful things with people who need them. List what you no longer
              use, discover what&apos;s nearby, and make less waste together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/search" className="btn-primary">
                <Search size={17} /> Find a gift
              </Link>
              <Link to={isLoggedIn ? "/giveaways" : "/register"} className="btn-secondary">
                Give something <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-card hero-card-main">
              <img src="/images/couch2.jpeg" alt="" />
            </div>
            <div className="hero-card hero-card-small">
              <img src="/images/lamp.jpeg" alt="" />
            </div>
            <div className="hero-note">One small gift can start a generous chain.</div>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="page-wrap">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="section-title">
                Good finds,
                <br />
                <span className="display-serif text-[#08704c]">ready for a new home.</span>
              </h2>
            </div>
            <Link to="/search" className="btn-secondary">
              Browse all <ArrowRight size={17} />
            </Link>
          </div>
          {isLoadingAllGifts || isLoadingUser ? (
            <Loader />
          ) : errorInGettingAllGifts?.stack ? (
            <div className="surface p-8 text-center text-red-800">
              {errorInGettingAllGifts.message}
            </div>
          ) : (allGifts ?? []).length ? (
            <>
              <div className="gift-grid">
                {allGifts.map((g) => (
                  <GiftCard
                    key={g._id ?? g.id}
                    giftData={{
                      ...g,
                      date_added: g.createdAt
                        ? Math.floor(new Date(g.createdAt).getTime() / 1000)
                        : g.date_added,
                    }}
                    showWishlistButton={isLoggedIn}
                    isInWishlist={wishlistIds.includes(g._id)}
                    onAddToWishlist={add}
                    onRemoveFromWishlist={remove}
                  />
                ))}
              </div>
              <Pagination
                totalPages={paginationMeta?.totalPages}
                currentPage={paginationParams.currentPage}
                onPageChange={(currentPage) => setPaginationParams((p) => ({ ...p, currentPage }))}
              />
            </>
          ) : (
            <div className="surface p-10 text-center">
              <h3 className="font-serif text-2xl">The shelf is waiting.</h3>
              <p className="mt-2 text-[#627168]">Be the first to share something useful.</p>
            </div>
          )}
        </div>
      </section>
      <section className="dark-band page-section border-b border-white/15">
        <div className="page-wrap grid gap-8 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.14em] text-[#dce92b]">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-.05em]">
              Generosity,
              <br />
              <span className="display-serif text-[#dce92b]">made simple.</span>
            </h2>
          </div>
          {[
            ["01", "Share", "Post a clear photo and a few useful details."],
            ["02", "Connect", "Interested neighbors can find and contact you."],
            ["03", "Pass it on", "Hand over the gift and keep good things moving."],
          ].map(([n, t, d]) => (
            <div key={n} className="border-t border-white/20 pt-5">
              <span className="text-xs text-[#91a59a]">{n}</span>
              <h3 className="mt-8 font-serif text-2xl">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-[#b9c8bf]">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
