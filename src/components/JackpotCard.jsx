import React, { useState } from "react";
import jackpotBg from "../assets/jackpot-bg.png";
import BuyTicketPopup from "./BuyTicketPopup/BuyTicketPopup";

const JackpotCard = ({
  imageUrl,
  jackpot,
  nextDrawDate,
  resultsDate,
  numbers,
  isJackpotAlert,
  powerPlay,
  onPurchase,
  loading
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <>
      <div
        className="min-w-70 bg-gray-100 rounded-2xl relative overflow-clip flex flex-col justify-between"
        style={{
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.4)",
          height: "190px",
        }}
      >
        {/* --- Top Content --- */}
        <div className="p-2 flex-grow">
          <div className="flex flex-row justify-between items-start mb-1">
            <img
              src={imageUrl}
              alt="Lotto Extra"
              className="rounded-md object-contain h-10 w-auto"
            />

            <div className="text-right text-gray-700 text-[10px] font-semibold leading-tight">
              <div className="font-bold">Est. Annuitized Jackpot</div>
              <div className="text-[14px] font-bold">{jackpot}</div>
              <div className="text-[10px]">Next Draw: {nextDrawDate}</div>
            </div>
          </div>

          {isJackpotAlert ? (
            <div
              className="w-full mx-auto text-white font-semibold text-[12px] text-center mb-1 py-1 rounded"
              style={{
                backgroundImage: `url(${jackpotBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              ★ JACKPOT ALERT ★
            </div>
          ) : (
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>
          )}

          <div className="text-[10px] font-bold text-gray-600 mb-1 leading-none">
            <span className="font-semibold">Results for:</span> {resultsDate}
          </div>

          <div className="flex gap-1 justify-start mb-1">
            {numbers.map((num, idx) => (
              <div
                key={idx}
                className="w-5.5 h-5.5 bg-white border border-gray-500 rounded-full flex items-center justify-center text-[12px] font-bold leading-none"
              >
                {num}
              </div>
            ))}
          </div>
          {powerPlay && (
            <div className="text-[10px] font-semibold">
              Power Play x {powerPlay}
            </div>
          )}
        </div>

        {/* --- Bottom Buttons --- */}
        <div className="flex bg-[var(--color-primary)] text-nowrap text-[12px] mt-auto">
          <button
            onClick={handleOpenPopup} // 👈 open popup
            className="flex-1 text-white rounded py-2 font-semibold hover:bg-blue-800 transition-colors"
          >
            BUY TICKET
          </button>
          <div className="w-[1px] h-5 my-auto rounded-full bg-gray-400"></div>
          <button className="flex-1 text-white rounded py-2 font-semibold hover:bg-gray-400 transition-colors">
            PAST DRAWINGS
          </button>
        </div>
      </div>

      {/* --- BuyTicketPopup --- */}
      <BuyTicketPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onPurchase={onPurchase}
        loading={loading}
      />
    </>
  );
};

export default JackpotCard;
