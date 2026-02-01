import { useGetAllGifts } from "../hooks/giftHooks";
import GiftCard from "../components/GiftCard";
import Loader from "./../components/Loader";
import { useAppContext } from "../context/AuthContext";
import { Pagination } from "./../components/Pagination";
import { useState } from "react";

function MainPage() {
  const [paginationParams, setPaginationParams] = useState({
    currentPage: 1,
    limit: 10,
  });
  const {
    allGifts,
    isLoadingAllGifts,
    errorInGettingAllGifts,
    paginationMeta,
  } = useGetAllGifts(paginationParams);
  const { isLoadingUser } = useAppContext();
  return (
    <div className="pt-20 min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-500 blur-lg -z-10"></div>
      {isLoadingAllGifts || isLoadingUser ? (
        <Loader />
      ) : errorInGettingAllGifts?.stack ? (
        <p className="ml-4 text-lg font-semibold text-white">
          {errorInGettingAllGifts?.message}
        </p>
      ) : (
        <div className="relative p-10 shadow-xl rounded-xl w-full max-w-6xl">
          <h1 className="text-4xl font-bold text-yellow-400 drop-shadow-md">
            Available Gifts
          </h1>
          <p className="text-lg italic text-gray-200 mt-2">
            "Find what you need, share what you don't."
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full px-4">
            {allGifts.map((gift) => (
              <GiftCard key={gift.id} giftData={gift} />
            ))}
          </div>
          <Pagination
            totalPages={paginationMeta?.totalPages}
            currentPage={paginationParams?.currentPage}
            onPageChange={(nextPage) =>
              setPaginationParams((prev) => ({
                ...prev,
                currentPage: nextPage,
              }))
            }
          />
        </div>
      )}
    </div>
  );
}

export default MainPage;
