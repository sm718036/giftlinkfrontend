import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, getConditionClass } from "../utils/helpers";

const GiftCard = ({ giftData }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer">
      <img
        src={giftData.image || "/placeholder.png"}
        alt={giftData.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800">{giftData.name}</h2>
        <p
          className={`w-fit px-3 py-1 rounded-full text-sm font-medium text-white ${getConditionClass(
            giftData.condition
          )}`}
        >
          {giftData.condition}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {formatDate(giftData.date_added)}
        </p>
        <button
          onClick={() => navigate(`/gift/${giftData._id}`)}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full shadow-md transition transform hover:scale-105 cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default GiftCard;
