import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { formatDate } from "../utils/helpers";
import { useAppContext } from "../context/AuthContext";
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from "../hooks/wishlistHooks";
import { useUpdateGift, useDeleteGift } from "../hooks/giftHooks";
import AppDialog from "./AppDialog";
import EditGiftForm from "./EditGiftForm";

const GiftDetails = ({ giftDetails }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const giftId = giftDetails?._id;
  const isOwner =
    user?._id && giftDetails?.postedBy ? String(user._id) === String(giftDetails.postedBy) : false;
  const isTaken = !!giftDetails?.isTaken;
  const isSample = !!giftDetails?.isSample;

  const { wishlistIds } = useWishlist();
  const { addToWishlist, isAddingToWishlist } = useAddToWishlist();
  const { removeFromWishlist, isRemovingFromWishlist } = useRemoveFromWishlist();
  const { updateGift, isUpdatingGift } = useUpdateGift(giftId);
  const { deleteGift, isDeletingGift } = useDeleteGift();

  const isInWishlist = giftId && wishlistIds.includes(giftId);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    if (!giftId) return;
    try {
      if (isInWishlist) {
        await removeFromWishlist(giftId);
        toast.success("Removed from wishlist.");
      } else {
        await addToWishlist(giftId);
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  const handleMarkAsTaken = async () => {
    if (!giftId) return;
    try {
      await updateGift({ isTaken: true });
      toast.success("Gift marked as taken.");
    } catch (error) {
      console.error("Mark as taken error:", error);
    }
  };

  const handleDelete = async () => {
    if (!giftId) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this gift? This cannot be undone."
    );
    if (!confirmed) return;
    try {
      await deleteGift(giftId);
      toast.success("Gift deleted.");
      navigate("/giveaways");
    } catch (error) {
      console.error("Delete gift error:", error);
    }
  };

  return (
    <div>
      <div className="surface overflow-hidden">
        <div className="dark-band relative p-7 text-center">
          {isTaken && (
            <span className="absolute right-3 top-3 rounded-full bg-[#dce92b] px-3 py-1 text-sm font-semibold text-[#10261d]">
              Taken
            </span>
          )}
          <h2 className="font-serif text-4xl">{giftDetails?.name}</h2>
        </div>
        <div className="p-5 md:p-8">
          <div className="w-full max-w-3xl mx-auto mb-6">
            {giftDetails?.image ? (
              <img
                src={giftDetails?.image}
                alt={giftDetails?.name}
                className="max-h-[580px] w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="text-center text-gray-500 font-semibold py-12 bg-gray-100 rounded-lg">
                No Image Available
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {isSample && (
              <div className="w-full rounded-xl border border-[#d3df20] bg-[#eef49b] p-4 text-sm font-medium text-[#10261d]">
                This is a sample gift for demonstration only. It cannot be claimed or saved.
              </div>
            )}
            {!isOwner && !isSample && (
              <button
                type="button"
                onClick={handleWishlistToggle}
                disabled={isAddingToWishlist || isRemovingFromWishlist}
                className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer disabled:opacity-60 ${
                  isInWishlist ? "btn-secondary" : "btn-primary"
                }`}
              >
                {isAddingToWishlist || isRemovingFromWishlist
                  ? "..."
                  : isInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
              </button>
            )}
            {isOwner && (
              <>
                {!isTaken && (
                  <button
                    type="button"
                    onClick={handleMarkAsTaken}
                    disabled={isUpdatingGift}
                    className="btn-primary"
                  >
                    {isUpdatingGift ? "..." : "Mark as taken"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setEditDialogOpen(true)}
                  className="btn-secondary"
                >
                  Edit details
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeletingGift}
                  className="btn-danger"
                >
                  {isDeletingGift ? "Deleting..." : "Delete gift"}
                </button>
              </>
            )}
          </div>
          <div className="grid gap-4 border-t border-[#10261d]/15 pt-6 text-base leading-7 md:grid-cols-2">
            <p>
              <strong>Category:</strong> {giftDetails?.category}
            </p>
            <p>
              <strong>Condition:</strong> {giftDetails?.condition}
            </p>
            <p>
              <strong>Date Added:</strong>{" "}
              {giftDetails?.createdAt
                ? formatDate(Math.floor(new Date(giftDetails.createdAt).getTime() / 1000))
                : giftDetails?.date_added
                  ? formatDate(giftDetails.date_added)
                  : "—"}
            </p>
            <p>
              <strong>Age (Years):</strong> {giftDetails?.ageInYears ?? giftDetails?.age_years}
            </p>
            <p>
              <strong>Description:</strong> {giftDetails?.description}
            </p>
            {giftDetails?.contactInfo && (
              <p>
                <strong>Contact:</strong>{" "}
                {giftDetails.contactInfo.includes("@") ? (
                  <a
                    href={`mailto:${giftDetails.contactInfo.trim()}`}
                    className="font-bold text-[#08704c] hover:underline"
                  >
                    {giftDetails.contactInfo}
                  </a>
                ) : /[\d]/.test(giftDetails.contactInfo) ? (
                  <a
                    href={`tel:${giftDetails.contactInfo.replace(/\s/g, "")}`}
                    className="font-bold text-[#08704c] hover:underline"
                  >
                    {giftDetails.contactInfo}
                  </a>
                ) : (
                  <span>{giftDetails.contactInfo}</span>
                )}
              </p>
            )}
            {giftDetails?.address && (
              <p>
                <strong>Address:</strong> {giftDetails.address}
              </p>
            )}
          </div>
        </div>
      </div>

      <AppDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} title="Edit gift">
        <EditGiftForm gift={giftDetails} onSuccess={() => setEditDialogOpen(false)} />
      </AppDialog>
    </div>
  );
};

export default GiftDetails;
