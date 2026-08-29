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
    <div className="page-wrap page-section max-w-5xl">
      <button className="btn-secondary mb-6" onClick={handleBackClick}>
        Back
      </button>
      {isLoadingGiftDetails ? (
        <Loader />
      ) : errorInGettingGiftDetails?.stack ? (
        <div className="text-center text-red-500 mt-10">
          Error: {errorInGettingGiftDetails?.message}
        </div>
      ) : !giftDetails?._id ? (
        <div className="text-center text-gray-600 mt-10">Gift not found.</div>
      ) : (
        <GiftDetails giftDetails={giftDetails} />
      )}
    </div>
  );
}

export default DetailsPage;
