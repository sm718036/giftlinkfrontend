import React from "react";
import { formatDate } from "../utils/helpers";

const GiftDetails = ({ giftDetails }) => {
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg text-white p-6 text-center">
          <h2 className="text-3xl font-bold">{giftDetails?.name}</h2>
        </div>
        <div className="p-6">
          <div className="w-full max-w-3xl mx-auto mb-6">
            {giftDetails?.image ? (
              <img
                src={giftDetails?.image}
                alt={giftDetails?.name}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            ) : (
              <div className="text-center text-gray-500 font-semibold py-12 bg-gray-100 rounded-lg">
                No Image Available
              </div>
            )}
          </div>
          <div className="space-y-2 text-lg">
            <p>
              <strong>Category:</strong> {giftDetails?.category}
            </p>
            <p>
              <strong>Condition:</strong> {giftDetails?.condition}
            </p>
            <p>
              <strong>Date Added:</strong> {formatDate(giftDetails?.date_added)}
            </p>
            <p>
              <strong>Age (Years):</strong> {giftDetails?.age_years}
            </p>
            <p>
              <strong>Description:</strong> {giftDetails?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftDetails;
