import React, { useState, useEffect, useMemo, useRef } from "react";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";
import ScratchTicketCard from "../components/ScratchCard";
import BuyTicketModal from "../components/BuyTicketPopup/BuyTicketModal";
import poster from "../assets/poster.png";
import api from "../services/api";

import ScratchCard1 from "../assets/scratch-card-1.png";
import ScratchCard2 from "../assets/scratch-card-2.png";
import ScratchCard3 from "../assets/scratch-card-3.png";

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

  // Ref to avoid unnecessary rerenders
  const nearestSlotRef = useRef(null);

  // Convert 24h → AM/PM
  const toAMPM = (time) => {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const generateID = () =>
    Math.floor(10000 + Math.random() * 90000).toString();

  const getNearestSlot = (slots, selectedDate) => {
    if (!slots) return null;

    const [year, month, day] = selectedDate.split("-").map(Number);
    const now = new Date();

    const slotList = slots
      .map((slot) => {
        const [h, m, s] = slot.timeSlot.split(":").map(Number);
        const slotTime = new Date(year, month - 1, day, h, m, s);
        return { ...slot, dateObj: slotTime };
      })
      .sort((a, b) => a.dateObj - b.dateObj);

    return slotList.find((s) => s.dateObj > now) || slotList[0];
  };

  const tickets = useMemo(() => {
    if (!lotteryData) return [];

    const slot = getNearestSlot(
      lotteryData.availableSlots,
      lotteryData.selectedDate
    );

    nearestSlotRef.current = slot; // store for countdown

    if (!slot) return [];

    return slot.availableDenominations.map((d) => ({
      id: generateID(),
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

  // Smooth countdown (independent clock)
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
        return;
      }

      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      setCountdown(
        `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [lotteryData]);

  // Fetch API every 10 seconds — prevents lag
  useEffect(() => {
    const fetchLottery = async () => {
      try {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const res = await api.get("/gamma/lottery/options", {
          params: { date: dateStr },
        });

        const data = res.data || res;

        if (data.isDateAvailable) {
          setLotteryData(data);
          setError(null);
        } else {
          setLotteryData(null);
          setError("No lottery options available");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch lottery data");
        setLoading(false);
      }
    };

    fetchLottery();
    const interval = setInterval(fetchLottery, 10000); // smooth refresh
    return () => clearInterval(interval);
  }, []);

  const handleBuyClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    setPurchasedTickets((p) => [...p, selectedTicket]);
    alert(`🎟️ Ticket ${selectedTicket.id} purchased for ₹${selectedTicket.price}`);
    setIsModalOpen(false);
  };

  const nearestSlotName = tickets[0]?.slotName;

  return (
    <div className="bg-white min-h-screen">
      <img src={poster} className="w-full h-auto mb-4" alt="Poster" />

      <div className="p-3 space-y-2">
        <section>
          <h2 className="font-bold text-[14px] mb-2 flex items-center gap-2">
            DRAW GAMES (Next:{" "}
            {nearestSlotName || (loading ? "Loading..." : "No Slots")})
            {countdown && (
              <span className="text-blue-600 font-semibold">
                ⏳ {countdown}
              </span>
            )}
          </h2>

          <div className="flex space-x-3 overflow-x-auto p-4 pt-1 -mx-3">
            {tickets.map((ticket) => (
              <LotteryTicket
                key={ticket.id}
                {...ticket}
                canPurchase={true}
                loading={loading}
                onBuyClick={() => handleBuyClick(ticket)}
              />
            ))}
            {!loading && tickets.length === 0 && <div>No tickets available</div>}
          </div>
        </section>

        <section>
          <h2 className="font-bold text-[14px] mb-2">SCRATCH CARDS</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {scratchTicketsData.map((t, i) => (
              <ScratchTicketCard key={i} {...t} />
            ))}
          </div>
        </section>
      </div>

      {isModalOpen && selectedTicket && (
        <BuyTicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          price={selectedTicket.price}
          ticket={selectedTicket}
          onConfirm={handleConfirmPurchase}
          purchasedTickets={purchasedTickets}
          apiData={lotteryData}
        />
      )}

      {error && <div className="text-red-500 p-3">{error}</div>}
    </div>
  );
};

export default Home;
