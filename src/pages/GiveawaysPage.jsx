import { useState } from "react";
import { Plus } from "lucide-react";
import { useGetMyGifts } from "../hooks/giftHooks";
import GiftCard from "../components/GiftCard";
import Loader from "../components/Loader";
import AppDialog from "../components/AppDialog";
import PostGiftForm from "../components/PostGiftForm";
export default function GiveawaysPage() {
  const [open, setOpen] = useState(false);
  const { myGifts, isLoadingMyGifts, errorInGettingMyGifts } = useGetMyGifts();
  const card = (g) => ({
    ...g,
    date_added: g.createdAt ? Math.floor(new Date(g.createdAt).getTime() / 1000) : null,
  });
  return (
    <div className="page-section">
      <div className="page-wrap">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="section-title">
              My <span className="display-serif text-[#08704c]">giveaways.</span>
            </h1>
            <p className="section-copy">Manage the gifts you have shared with the community.</p>
          </div>
          <button onClick={() => setOpen(true)} className="btn-primary">
            <Plus size={18} /> Post a new gift
          </button>
        </div>
        {isLoadingMyGifts ? (
          <Loader />
        ) : errorInGettingMyGifts ? (
          <div className="surface p-8 text-center text-red-800">
            {errorInGettingMyGifts.message || "Failed to load your gifts."}
          </div>
        ) : myGifts?.length ? (
          <div className="gift-grid">
            {myGifts.map((g) => (
              <GiftCard key={g._id} giftData={card(g)} />
            ))}
          </div>
        ) : (
          <div className="surface p-12 text-center">
            <h2 className="font-serif text-2xl">Nothing shared yet.</h2>
            <p className="mt-2 text-[#627168]">
              Your unused item could be exactly what someone needs.
            </p>
            <button onClick={() => setOpen(true)} className="btn-primary mt-6">
              Share your first gift
            </button>
          </div>
        )}
      </div>
      <AppDialog open={open} onClose={() => setOpen(false)} title="Share a gift with the community">
        <PostGiftForm onSuccess={() => setOpen(false)} />
      </AppDialog>
    </div>
  );
}
