import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Heart } from "lucide-react";
import { formatDate } from "../utils/helpers";

export default function GiftCard({
  giftData,
  showWishlistButton = false,
  isInWishlist = false,
  onAddToWishlist,
  onRemoveFromWishlist,
}) {
  const navigate = useNavigate();
  const isSample = Boolean(giftData?.isSample);
  const toggle = (event) => {
    event.stopPropagation();
    isInWishlist ? onRemoveFromWishlist?.(giftData._id) : onAddToWishlist?.(giftData._id);
  };

  return (
    <article className="gift-card">
      {isSample ? (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#dce92b] px-3 py-1 text-xs font-bold text-[#10261d]">
          Sample gift
        </span>
      ) : (
        giftData?.isTaken && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#10261d] px-3 py-1 text-xs font-bold text-white">
            Already taken
          </span>
        )
      )}
      {showWishlistButton && !isSample && (
        <button
          type="button"
          onClick={toggle}
          className="icon-button absolute right-3 top-3 z-10"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={19} className={isInWishlist ? "fill-[#ff7a36] text-[#ff7a36]" : ""} />
        </button>
      )}
      <img
        src={giftData.image || "/images/coffee-table.jpeg"}
        alt={giftData.name}
        className="gift-card-image"
        loading="lazy"
      />
      <div className="gift-card-body">
        <div className="gift-card-meta">
          <span className="status-pill">{giftData.condition || "Pre-loved"}</span>
          <span>{isSample ? giftData.category : formatDate(giftData.date_added)}</span>
        </div>
        <h2 className="gift-card-title">{giftData.name}</h2>
        {isSample ? (
          <p className="mt-5 text-sm font-bold text-[#627168]">Example listing</p>
        ) : (
          <button
            onClick={() => navigate(`/gift/${giftData._id}`)}
            className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#063f2c]"
          >
            View details <ArrowUpRight size={16} />
          </button>
        )}
      </div>
    </article>
  );
}
