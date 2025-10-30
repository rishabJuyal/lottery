import React, { useState, useEffect } from "react";
import LotteryTicket from "./LotteryTicket";

const BuyTicketPopup = ({ isOpen, onClose, onPurchase, loading }) => {
  const [canPurchase, setCanPurchase] = useState(true);

  // --- Lock background scroll when popup is open ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = ""; // unlock scroll
    }
    return () => {
      document.body.style.overflow = ""; // cleanup on unmount
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const check = () => {
      const now = new Date();
      const nextDraw = new Date(now);
      nextDraw.setHours(17, 0, 0, 0);
      if (now > nextDraw) nextDraw.setDate(nextDraw.getDate() + 1);
      const diff = nextDraw.getTime() - now.getTime();
      setCanPurchase(diff > 30 * 60 * 1000);
    };
    check();
    const timer = setInterval(check, 60000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) onClose();
  };

  return (
    <div
      className="popup-overlay m-0 fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      {/* Modal Container */}
      <div
        className="relative mt-10 bg-gray-100 w-[95%] max-w-[420px] h-[85vh] flex flex-col overflow-hidden rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🧭 Fixed Header */}
        <div className="sticky top-0 bg-[var(--color-primary)] border-b border-gray-300 shadow-sm flex justify-between items-center px-4 py-1 z-10">
          <h2 className="text-sm font-bold text-white">Buy Tickets</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-600 text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* 🧾 Scrollable Ticket List */}
        <div className="flex flex-col items-center gap-4 p-4 overflow-y-auto">
          <LotteryTicket
            onClose={onClose}
            onPurchase={onPurchase}
            loading={loading}
            canPurchase={canPurchase}
          />
          <LotteryTicket
            onClose={onClose}
            onPurchase={onPurchase}
            loading={loading}
            canPurchase={canPurchase}
          />
          <LotteryTicket
            onClose={onClose}
            onPurchase={onPurchase}
            loading={loading}
            canPurchase={canPurchase}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyTicketPopup;
