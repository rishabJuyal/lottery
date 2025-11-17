import React, { useState, useEffect, useRef } from "react";
import LotteryTicket from "./LotteryTicket";
import DrawSelector from "./DrawSelector";
import PurchaseResultModal from "./PurchaseResultModal";
import api from "../../services/api"; // make sure your api instance is imported

const BuyTicketModal = ({
    isOpen,
    onClose,
    price,
    ticket,
    purchasedTickets = [],
    apiData, // API response
}) => {
    /** ----------------------------------------------------------
     *  Convert "22:00:00" → "10:00 PM"
     * ---------------------------------------------------------- */
    const convertToAMPM = (time) => {
        if (!time) return "";
        const [h, m] = time.split(":");
        let hour = parseInt(h);
        const modifier = hour >= 12 ? "PM" : "AM";
        if (hour === 0) hour = 12;
        else if (hour > 12) hour -= 12;
        return `${hour}:${m} ${modifier}`;
    };

    /** ----------------------------------------------------------
     *  Map full API response into usable structure
     * ---------------------------------------------------------- */
    const drawTimes =
        apiData?.availableSlots?.map((slot) => ({
            label: convertToAMPM(slot.timeSlot),
            value: slot.timeSlot,
            slotName: slot.slotName,
            slotCode: slot.slotCode,
            denominations: slot.availableDenominations,
        })) || [];

    const [quantity, setQuantity] = useState(1);
    const [tempQuantity, setTempQuantity] = useState(1);
    const [tickets, setTickets] = useState([]);
    const [animateIn, setAnimateIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [purchasing, setPurchasing] = useState(false); // separate purchase loading
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(price);

    const [purchaseResult, setPurchaseResult] = useState({ isOpen: false, message: "" });

    const debounceRef = useRef(null);

    /** Auto animate */
    useEffect(() => {
        setAnimateIn(isOpen);
    }, [isOpen]);

    /** DETECT SELECTED SLOT + SELECTED DENOMINATION */
    const selectedSlot = drawTimes.find((t) => t.value === selectedTime);
    const selectedDenominationObject = selectedSlot?.denominations?.find(
        (d) => d.denomination === selectedPrice
    );

    const maxTickets = Math.min(
        selectedDenominationObject?.maxTickets || 500,
        selectedDenominationObject?.availableTickets ?? 0
    );
    const isAvailable = selectedDenominationObject?.isAvailable ?? false;

    /** Generate tickets whenever quantity or selection changes */
    useEffect(() => {
        if (!ticket) return;
        setLoading(true);
        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            let startId = parseInt(ticket.id);
            const generated = [];
            let count = 0;

            while (generated.length < quantity) {
                if (!purchasedTickets.includes(startId.toString())) {
                    generated.push({
                        ...ticket,
                        id: '??????',
                        drawDate: selectedDate,
                        drawTime: selectedTime,
                        price: selectedPrice,
                    });
                }
                startId++;
                count++;
                if (count > 2000) break;
            }

            setTickets(generated);
            setLoading(false);
        }, 300);
    }, [quantity, ticket, purchasedTickets, selectedDate, selectedTime, selectedPrice]);

    /** Default date & pre-select drawTime + price based on ticket */
    useEffect(() => {
        if (!isOpen || !ticket) return;

        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(ticket.drawDate || today);

        const defaultSlot = drawTimes.find(t => t.value === ticket.drawTime) || drawTimes[0];

        if (defaultSlot) {
            setSelectedTime(
                ticket.drawTime && drawTimes.some(t => t.value === ticket.drawTime)
                    ? ticket.drawTime
                    : defaultSlot.value
            );

            const defaultPriceObj = defaultSlot.denominations.find(d => d.denomination === ticket.price) || defaultSlot.denominations[0];
            setSelectedPrice(
                ticket.price && defaultSlot.denominations.some(d => d.denomination === ticket.price)
                    ? ticket.price
                    : defaultPriceObj.denomination
            );
        }

        setQuantity(1);
        setTempQuantity(1);
    }, [isOpen, apiData, ticket]);

    /** Handle Buy */
    const handleConfirm = async () => {
        if (!selectedDate || !selectedTime || !selectedPrice || !quantity) return;

        try {
            setPurchasing(true);

            const payload = {
                lotteryDate: selectedDate,
                slotCode: selectedSlot.slotCode,
                denomination: selectedPrice,
                ticketCount: quantity,
            };

            const response = await api.post("/gamma/lottery/purchase", payload);

            if (response) {
                setPurchaseResult({
                    isOpen: true,
                    message: response.message || "Purchase successful!",
                });
            } else {
                setPurchaseResult({
                    isOpen: true,
                    message: response.message || "Failed to purchase tickets.",
                });
            }
        } catch (error) {
            console.error("Purchase failed", error);
            setPurchaseResult({
                isOpen: true,
                message: "Purchase failed. Please try again.",
            });
        } finally {
            setPurchasing(false);
        }
    };

    /** Quantity controls */
    const adjustQuantity = (val) => {
        const newVal = Math.max(1, Math.min(maxTickets, quantity + val));
        setQuantity(newVal);
        setTempQuantity(newVal);
    };

    const handleBlur = () => {
        let valid = parseInt(tempQuantity) || 1;
        if (valid < 1) valid = 1;
        if (valid > maxTickets) valid = maxTickets;
        setTempQuantity(valid);
        setQuantity(valid);
    };

    if (!isOpen || !ticket) return null;

    /** Purchase loading overlay */
    const PurchaseLoadingOverlay = () => (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-lg animate-pulse">
                <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full mb-4"></div>
                <span className="text-gray-800 font-semibold">Processing your purchase...</span>
            </div>
        </div>
    );

    return (
        <>
            <div
                className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${animateIn ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            >
                <div
                    className={`bg-orange-50 rounded-t-lg shadow-xl w-full max-w-md transition-transform duration-300 ${animateIn ? "translate-y-0" : "translate-y-full"
                        }`}
                    style={{ maxHeight: "90vh", position: "relative" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {purchasing && <PurchaseLoadingOverlay />}

                    {/* Header */}
                    <div
                        style={{ background: "var(--bg-gradient)" }}
                        className="p-3 text-center rounded-t-lg relative"
                    >
                        <h2 className="text-[15px] font-extrabold text-white">
                            BUY TICKETS • ₹{selectedPrice} EACH
                        </h2>
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-4 text-white/80 hover:text-red-200 text-lg"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Draw Selector */}
                    <DrawSelector
                        drawTimes={drawTimes}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        selectedPrice={selectedPrice}
                        onDateChange={setSelectedDate}
                        onTimeChange={setSelectedTime}
                        onPriceChange={setSelectedPrice}
                    />

                    {/* Tickets List */}
                    <div className="min-h-104 flex-1 overflow-x-auto flex gap-3 p-4 pb-40 snap-x snap-mandatory">
                        {loading ? (
                            <div className="flex w-full justify-center items-center text-gray-600 font-semibold text-sm">
                                <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full mr-2"></div>
                                Loading tickets...
                            </div>
                        ) : (
                            tickets.map((t, index) => (
                                <div key={index} className="flex-shrink-0 snap-center w-[320px]">
                                    <div className="mb-2 text-center text-sm text-gray-800 font-semibold bg-orange-200 py-1 px-2 shadow-inner">
                                        <span className="mr-2">🎟️ Ticket #{index + 1}</span>
                                        <span className="mx-1 text-orange-600 font-bold">₹{t.price}</span>
                                        <span className="mx-1 text-gray-600">• Draw: {convertToAMPM(t.drawTime)}</span>
                                    </div>
                                    <LotteryTicket {...t} canPurchase={false} />
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div
                        style={{ background: "var(--bg-gradient)" }}
                        className="absolute bottom-0 left-0 right-0 border-t p-4 py-8"
                    >
                        <div className="flex items-center justify-between gap-3 mb-3">
                            {/* Quantity */}
                            <div className="flex items-center bg-[#fdf7ef] px-3 py-2 w-1/2 border shadow-inner">
                                <span className="text-sm font-semibold text-gray-600 mr-2">🎟️</span>
                                <input
                                    type="number"
                                    min="1"
                                    max={maxTickets}
                                    value={tempQuantity}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === "" || /^\d+$/.test(val)) {
                                            const num = val === "" ? "" : Math.min(Number(val), maxTickets);
                                            setTempQuantity(num);
                                            if (num !== "") setQuantity(num);
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    className="bg-transparent text-gray-800 w-full text-center outline-none text-sm"
                                />
                            </div>

                            {/* Buy Button */}
                            <button
                                onClick={handleConfirm}
                                disabled={!tempQuantity || !isAvailable || maxTickets === 0 || purchasing}
                                className={`w-1/2 ${!tempQuantity || !isAvailable || maxTickets === 0 || purchasing
                                        ? "bg-orange-200 text-gray-700 cursor-not-allowed"
                                        : "bg-gradient-to-b from-[#ffed33] to-[#f46d04] text-[#3b2300]"
                                    } font-bold py-2 shadow-md border border-yellow-300 active:scale-95`}
                                title={
                                    !isAvailable
                                        ? "Tickets not available for this price"
                                        : maxTickets === 0
                                            ? "No tickets available"
                                            : ""
                                }
                            >
                                {purchasing ? "Purchasing..." : `BUY ₹${(tempQuantity || 0) * selectedPrice}`}
                            </button>
                        </div>

                        {/* Quick Select */}
                        <div className="flex justify-between text-xs text-gray-600 font-medium">
                            {[{ label: "Min", value: 1 }, { label: "+25", value: 25 }, { label: "+50", value: 50 }, { label: "+100", value: 100 }, { label: "Max", value: maxTickets }]
                                .map((btn, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            btn.label === "Min"
                                                ? (setQuantity(1), setTempQuantity(1))
                                                : btn.label === "Max"
                                                    ? (setQuantity(maxTickets), setTempQuantity(maxTickets))
                                                    : adjustQuantity(btn.value)
                                        }
                                        disabled={!isAvailable || maxTickets === 0 || purchasing}
                                        className={`flex-1 py-1 mx-1 border transition ${!isAvailable || maxTickets === 0 || purchasing
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
                                                : "bg-[#fdf7ef] hover:bg-[#f9edd8] border-gray-300"
                                            }`}
                                    >
                                        {btn.label}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Purchase Result Modal */}
            <PurchaseResultModal
                isOpen={purchaseResult.isOpen}
                onClose={() => {
                    setPurchaseResult({ isOpen: false, message: "" });
                    onClose(); // close BuyTicketModal as well
                }}
                message={purchaseResult.message}
            />
        </>
    );
};

export default BuyTicketModal;
