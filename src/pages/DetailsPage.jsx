import { useParams } from "react-router-dom";
import { useGetGiftDetailsById } from "../hooks/giftHooks";
import GiftDetails from "../components/GiftDetails";
import Loader from "../components/Loader";

function DetailsPage() {
  const { giftId } = useParams();

  const { giftDetails, isLoadingGiftDetails, errorInGettingGiftDetails } =
    useGetGiftDetailsById(giftId);
  function handleBackClick() {
    window.history.back();
  }

  return (
    <div className="pt-30 max-w-4xl mx-auto p-6">
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900  px-4 py-2 rounded-md mb-6 transition cursor-pointer"
        onClick={handleBackClick}
      >
        Back
      </button>
      {isLoadingGiftDetails ? (
        <Loader />
      ) : errorInGettingGiftDetails?.stack ? (
        <div className="text-center text-red-500 mt-10">
          Error: {errorInGettingGiftDetails?.message}
        </div>
      ) : (
        <GiftDetails giftDetails={giftDetails} />
      )}
    </div>
  );
}

export default DetailsPage;
