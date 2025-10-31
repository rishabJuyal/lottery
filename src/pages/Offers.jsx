import React from "react";
import poster from '../assets/poster.png'

const Offers = () => {
  const offers = [poster, poster, poster, poster]; // 👈 Add as many as you want

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-120px)] p-2 pt-4">
      <div className="flex flex-col items-center gap-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-sm overflow-hidden w-full max-w-md hover:scale-[1.02] transition-transform duration-200"
          >
            <img
              src={offer}
              alt={`Offer ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
