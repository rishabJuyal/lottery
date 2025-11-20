import React, { useState, useEffect, useMemo, useRef } from "react";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";
import ScratchTicketCard from "../components/ScratchCard";
import BuyTicketModal from "../components/BuyTicketPopup/BuyTicketModal";
import poster from "../assets/poster.png";
import api from "../services/api";

import ScratchCard1 from "../assets/scratch-card-1.png";
import ScratchCard2 from "../assets/scratch-card-2.png";
import ScratchCard3 from "../assets/scratch-card-3.png";
import FloatingResultButton from "../components/FloatingResultButton";
import ResultModal from "../components/ResultModal";

const scratchTicketsData = [
  { id: "#2671", price: "$20", imageUrl: ScratchCard1, startDate: "10/20/25" },
  { id: "#2693", price: "$5", imageUrl: ScratchCard2, startDate: "10/20/25" },
  { id: "#2689", price: "$2", imageUrl: ScratchCard3, startDate: "10/20/25" },
];

const Home = () => {
  const [lotteryData, setLotteryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  const [countdown, setCountdown] = useState("");
  const [isResultOpen, setIsResultOpen] = useState(false);

  const nearestSlotRef = useRef(null);

  const toAMPM = (time) => {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const getNearestSlot = (slots, selectedDate) => {
    if (!slots) return null;

    const [yr, mo, da] = selectedDate.split("-").map(Number);
    const now = new Date();

    const list = slots
      .map((slot) => {
        const [h, m, s] = slot.timeSlot.split(":").map(Number);
        return {
          ...slot,
          dateObj: new Date(yr, mo - 1, da, h, m, s),
        };
      })
      .sort((a, b) => a.dateObj - b.dateObj);

    return list.find((s) => s.dateObj > now) || list[0];
  };

  const tickets = useMemo(() => {
    if (!lotteryData) return [];

    const slot = getNearestSlot(lotteryData.availableSlots, lotteryData.selectedDate);
    nearestSlotRef.current = slot;

    if (!slot) return [];

    return slot.availableDenominations.map((d) => ({
      id: "********",
      drawNumber: slot.slotCode,
      price: d.denomination,
      prizeValue: d.prizePool,
      drawDate: lotteryData.selectedDate,
      drawTime: toAMPM(slot.timeSlot),
      slotName: slot.slotName,
      drawDay: new Date(lotteryData.selectedDate)
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase(),
    }));
  }, [lotteryData]);

  // ----------------- Fetch API -----------------
  const fetchLottery = async () => {
    setLoading(true);
    try {
      const t = new Date();
      const yyyy = t.getFullYear();
      const mm = String(t.getMonth() + 1).padStart(2, "0");
      const dd = String(t.getDate()).padStart(2, "0");

      const res = await api.get("/gamma/lottery/options", {
        params: { date: `${yyyy}-${mm}-${dd}` },
      });

      const data = res.data || res;

      if (data.isDateAvailable) {
        setLotteryData(data);
        setError(null);
      } else {
        setLotteryData(null);
        setError("No lottery options available today.");
      }
    } catch {
      setError("Failed to fetch lottery data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLottery(); // fetch once on page load
  }, []);

  // ----------------- Countdown -----------------
  useEffect(() => {
    const interval = setInterval(() => {
      const slot = nearestSlotRef.current;
      if (!slot || !lotteryData) return;

      const [h, m, s] = slot.timeSlot.split(":").map(Number);
      const [yr, mo, da] = lotteryData.selectedDate.split("-").map(Number);

      const target = new Date(yr, mo - 1, da, h, m, s);
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("00:00");
        fetchLottery(); // fetch again when countdown reaches 0
        return;
      }

      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown(`${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [lotteryData]);

  const nearestSlotName = tickets[0]?.slotName;

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        background: "linear-gradient(135deg, #fff7da, #ffe08a)",
      }}
    >
      {/* Poster */}
      <img
        src={poster}
        alt="poster"
        className="w-full h-auto mb-3"
        style={{ borderBottom: "3px solid #f46d04" }}
      />

      {/* Draw Games */}
      <div>
        <div
          className="px-3 py-2 mb-2 flex justify-between items-center"
          style={{
            background: "#a20604",
            color: "#ffed33",
            border: "2px solid #f46d04",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            borderRadius: "0",
          }}
        >
          <span className="font-bold text-[12px] uppercase tracking-wide">
            DRAW GAMES {nearestSlotName ? `(${nearestSlotName})` : ""}
          </span>

          {countdown && <span className="font-bold text-md">⏳ {countdown}</span>}
        </div>

        <div className="flex space-x-3 overflow-x-auto p-3">
          {tickets.map((t) => (
            <LotteryTicket
              key={t.id}
              {...t}
              loading={loading}
              canPurchase={true}
              onBuyClick={() => {
                setSelectedTicket(t);
                setIsModalOpen(true);
              }}
            />
          ))}

          {!loading && tickets.length === 0 && (
            <div className="text-red-700">No tickets available</div>
          )}
        </div>
      </div>

      {/* Scratch Cards */}
      <div className="mt-4">
        <div
          className="px-3 py-2 mb-2"
          style={{
            background: "#a20604",
            color: "#ffed33",
            border: "2px solid #f46d04",
            borderRadius: "0",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <h2 className="font-bold text-[12px] uppercase">Scratch Cards</h2>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4">
          {scratchTicketsData.map((sc, i) => (
            <ScratchTicketCard key={i} {...sc} />
          ))}
        </div>
      </div>

      {/* Buy Ticket Modal */}
      {isModalOpen && selectedTicket && (
        <BuyTicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          price={selectedTicket.price}
          ticket={selectedTicket}
          purchasedTickets={purchasedTickets}
          apiData={lotteryData}
        />
      )}

      {error && <div className="text-red-600 px-4 py-2">{error}</div>}

      <FloatingResultButton onClick={() => setIsResultOpen(true)} />
      <ResultModal isOpen={isResultOpen} onClose={() => setIsResultOpen(false)} />
    </div>
  );
};

export default Home;
