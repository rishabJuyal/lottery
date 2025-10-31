import React, { useState, useEffect } from "react";
import LotteryTicket from "./LotteryTicket";

const BuyTicketModal = ({ isOpen, onClose, price, ticket, purchasedTickets = [] }) => {
  if (!isOpen || !ticket) return null;

  const [purchaseType, setPurchaseType] = useState("single"); // "single" | "lot"
  const [selectedLot, setSelectedLot] = useState(1);
  const [tickets, setTickets] = useState([]);

  // 🎟️ Generate tickets dynamically when in "lot" mode
  useEffect(() => {
    if (purchaseType === "lot" && ticket) {
      const totalTickets = selectedLot * 25;
      let startId = parseInt(ticket.id);

      const generated = [];
      let count = 0;

      // generate tickets while skipping purchased ones
      while (generated.length < totalTickets) {
        if (!purchasedTickets.includes(startId.toString())) {
          generated.push({ ...ticket, id: startId.toString() });
        }
        startId++;
        count++;
        if (count > 1000) break; // safety to prevent infinite loop
      }

      setTickets(generated);
    } else {
      setTickets([ticket]);
    }
  }, [purchaseType, selectedLot, ticket, purchasedTickets]);

  const handleConfirm = () => {
    const totalTickets = purchaseType === "lot" ? tickets.length : 1;
    const totalPrice = totalTickets * parseInt(price);

    alert(
      `✅ Purchased ${totalTickets} ticket${totalTickets > 1 ? "s" : ""} — Total ₹${totalPrice}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[95%] sm:w-[420px] max-h-[90vh] overflow-y-auto p-5 relative">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
        >
          ✖
        </button>

        {/* 🏷️ Header */}
        <h2 className="text-xl font-bold text-center text-green-700 mb-4">
          Buy Ticket — ₹{price}
        </h2>

        {/* 💳 Purchase Type */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setPurchaseType("single")}
            className={`px-3 py-2 rounded-md text-sm font-semibold border ${
              purchaseType === "single"
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 hover:bg-green-100"
            }`}
          >
            Single
          </button>
          <button
            onClick={() => setPurchaseType("lot")}
            className={`px-3 py-2 rounded-md text-sm font-semibold border ${
              purchaseType === "lot"
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 hover:bg-green-100"
            }`}
          >
            Buy in Lot
          </button>
        </div>

        {/* 🎟️ Ticket Display */}
        {purchaseType === "single" ? (
          <div className="flex justify-center mb-6">
            <LotteryTicket {...ticket} canPurchase={false} loading={false} />
          </div>
        ) : (
          <>
            {/* Lot Selector */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2 text-gray-700 text-center">
                Select Lot (Each Lot = 25 Tickets)
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setSelectedLot(i + 1)}
                    className={`px-3 py-1.5 text-sm rounded-md font-semibold border ${
                      selectedLot === i + 1
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-300 hover:bg-green-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Ticket Scroll */}
            <div className="flex overflow-x-auto gap-3 pb-2 px-2 scrollbar-thin scrollbar-thumb-green-400">
              {tickets.map((t) => (
                <div key={t.id} className="flex-shrink-0 w-[340px]">
                  <LotteryTicket {...t} canPurchase={false} loading={false} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* 💰 Total */}
        <div className="mt-6 text-right font-bold text-gray-800">
          Total: ₹{purchaseType === "single" ? price : tickets.length * parseInt(price)}
        </div>

        {/* ✅ Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full mt-3 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default BuyTicketModal;
