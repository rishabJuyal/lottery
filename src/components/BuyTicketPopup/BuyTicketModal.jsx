import React, { useState, useEffect } from "react";
import LotteryTicket from "./LotteryTicket";

const BuyTicketModal = ({ isOpen, onClose, price, ticket, purchasedTickets = [] }) => {
    const [quantity, setQuantity] = useState(25);
    const [tickets, setTickets] = useState([]);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimateIn(true);
        } else {
            setAnimateIn(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (ticket) {
            let startId = parseInt(ticket.id);
            const generated = [];
            let count = 0;

            while (generated.length < quantity) {
                if (!purchasedTickets.includes(startId.toString())) {
                    generated.push({ ...ticket, id: startId.toString() });
                }
                startId++;
                count++;
                if (count > 2000) break; // safety cap
            }

            setTickets(generated);
        }
    }, [quantity, ticket, purchasedTickets]);

    const handleConfirm = () => {
        const totalPrice = quantity * parseInt(price);
        alert(`✅ Purchased ${quantity} tickets — Total ₹${totalPrice}`);
        onClose();
    };

    const adjustQuantity = (val) => {
        const newVal = Math.max(1, quantity + val);
        setQuantity(newVal);
    };

    if (!isOpen || !ticket) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${animateIn ? "opacity-100" : "opacity-0"
                }`}
            onClick={onClose} // closes when clicking outside
        >
            {/* Modal */}
            <div
                className={`bg-orange-50 rounded-t-lg shadow-xl w-full max-w-md transition-transform duration-300 ${animateIn ? "translate-y-0" : "translate-y-full"
                    }`}
                style={{ maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                {/* 🧭 Header */}
                <div
                    style={{ background: "var(--bg-gradient)" }}
                    className="p-3 text-center rounded-t-lg relative"
                >
                    <h2 className="text-[15px] font-extrabold text-white">
                        BUY TICKETS • ₹{price} EACH
                    </h2>
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-4 text-white/80 hover:text-red-200 text-lg"
                    >
                        ✖
                    </button>
                </div>

                {/* 🎟️ Ticket Scroll */}
                <div className="flex-1 overflow-x-auto flex gap-3 p-4 pb-40 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400">
                    {tickets.map((t) => (
                        <div key={t.id} className="flex-shrink-0 snap-center w-[320px]">
                            <LotteryTicket {...t} canPurchase={false} loading={false} />
                        </div>
                    ))}
                </div>

                {/* ⚙️ Footer */}
                {/* ⚙️ Footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-orange-100 border-t border-gray-200 p-4 py-8  shadow-[0_-3px_10px_rgba(0,0,0,0.08)]">
                    {/* Quantity + Buy */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                        {/* Quantity Box */}
                        <div className="flex items-center bg-[#fdf7ef] rounded-lg px-3 py-2 w-1/2 border border-gray-300 shadow-inner">
                            <span className="text-sm font-semibold text-gray-600 mr-2">🎟️</span>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                                className="bg-transparent text-gray-800 w-full text-center outline-none text-sm"
                            />
                        </div>

                        {/* Buy Button */}
                        <button
                            onClick={handleConfirm}
                            className="w-1/2 bg-gradient-to-b from-[#ffed33] to-[#f46d04] text-[#3b2300] font-bold py-2 rounded-lg shadow-md border border-yellow-300 active:scale-95 transition-transform"
                        >
                            BUY ₹{quantity * parseInt(price)}
                        </button>
                    </div>

                    {/* Quick Select Buttons */}
                    <div className="flex justify-between text-xs text-gray-600 font-medium">
                        {[
                            { label: "Min", value: 1 },
                            { label: "+25", value: 25 },
                            { label: "+50", value: 50 },
                            { label: "+100", value: 100 },
                            { label: "Max", value: 500 },
                        ].map((btn, idx) => (
                            <button
                                key={idx}
                                onClick={() =>
                                    btn.label === "Min"
                                        ? setQuantity(1)
                                        : btn.label === "Max"
                                            ? setQuantity(500)
                                            : adjustQuantity(btn.value)
                                }
                                className="flex-1 py-1 mx-1 bg-[#fdf7ef] hover:bg-[#f9edd8] border border-gray-300 rounded-md transition"
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BuyTicketModal;
