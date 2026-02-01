import React from "react";
import { useNavigate } from "react-router-dom";

const SearchGiftCard = ({ gift }) => {
  const navigate = useNavigate();
  const goToDetailsPage = (giftId) => {
    navigate(`/gift/${giftId}`);
    return;
  };
  return (
    <div key={gift.id} className="mb-4 md:basis-[45%]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer">
        {gift.image && (
          <img
            src={gift.image}
            alt={gift.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h5 className="text-lg font-semibold">{gift.name}</h5>
          <p className="text-gray-600 text-sm">
            {gift.description.slice(0, 100)}...
          </p>
          <p className="text-gray-600 text-sm">
            {gift.age_years.toFixed(1)} Years
          </p>
        </div>
        <div className="bg-gray-100 p-4 flex justify-between items-center">
          <button
            onClick={() => goToDetailsPage(gift._id)}
            className="bg-[#ff7f50] text-white py-2 px-4 rounded-lg hover:bg-[#ff5f40] transform transition duration-300 hover:scale-105 shadow-md cursor-pointer"
          >
            Check Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchGiftCard;
