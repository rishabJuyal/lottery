import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LotteryTicket from "./LotteryTicket";
import BuyTicketModal from "./BuyTicketModal";
import DrawSelector from "./DrawSelector"; // ✅ new component

const BuyTicketPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🎯 price and prize values
  const [price, setPrice] = useState(() => {
    return (
      location.state?.price ||
      localStorage.getItem("ticketPrice") ||
      "100"
    );
  });

  const [prizeValue, setPrizeValue] = useState(() => {
    return (
      location.state?.prizeValue ||
      localStorage.getItem("ticketPrizeValue") ||
      "1,00,000"
    );
  });

  useEffect(() => {
    if (location.state?.price) localStorage.setItem("ticketPrice", location.state.price);
    if (location.state?.prizeValue) localStorage.setItem("ticketPrizeValue", location.state.prizeValue);
  }, [location.state]);

  const drawTimes = ["11:05 AM", "12:15 PM", "1 PM", "3 PM", "5 PM"];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [drawDay, setDrawDay] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getDayName = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();

  const getAvailableTimes = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const parse = (t) => {
      const [time, mod] = t.split(" ");
      let [h, m] = time.split(":").map(Number);
      if (isNaN(m)) m = 0;
      if (mod === "PM" && h !== 12) h += 12;
      if (mod === "AM" && h === 12) h = 0;
      return h * 60 + m;
    };
    return drawTimes.filter((t) => parse(t) > currentMinutes);
  };

  // 🕐 initialize defaults
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    const availableTimes = getAvailableTimes();
    if (availableTimes.length) {
      setSelectedTime(availableTimes[0]);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split("T")[0]);
      setSelectedTime(drawTimes[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) setDrawDay(getDayName(selectedDate));
  }, [selectedDate]);

  const purchasedTickets = ["10005", "10010", "10025", "10030", "10050"];

  useEffect(() => {
    if (!selectedDate || !selectedTime) return;
    setLoadingTickets(true);

    const timeout = setTimeout(() => {
      const initialId = 10000;
      const totalTickets = 100;
      const drawDateFormatted = new Date(selectedDate).toLocaleDateString("en-GB");

      const generated = Array.from({ length: totalTickets }, (_, i) => ({
        id: (initialId + i).toString(),
        drawNumber: 200 + i,
        price,
        prizeValue,
        drawDate: drawDateFormatted,
        drawTime: selectedTime,
        drawDay,
      }));

      const availableTickets = generated.filter(
        (ticket) => !purchasedTickets.includes(ticket.id)
      );

      setTickets(availableTickets);
      setLoadingTickets(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [selectedDate, selectedTime, drawDay, price, prizeValue]);

  const handleBuyClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    alert(`🎟️ Ticket ${selectedTicket.id} purchased successfully for ₹${selectedTicket.price}`);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-4">
      {/* 🧭 Date & Time Selector */}
      <DrawSelector
        drawTimes={drawTimes}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onDateChange={setSelectedDate}
        onTimeChange={setSelectedTime}
      />

      {/* ⏳ Ticket Display */}
      {loadingTickets ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold mt-3">Loading tickets...</p>
        </div>
      ) : tickets.length > 0 ? (
        <div className="flex flex-col items-center gap-4 p-4 w-full max-w-[420px]">
          {tickets.map((ticket) => (
            <LotteryTicket
              key={ticket.id}
              {...ticket}
              canPurchase={true}
              loading={false}
              onBuyClick={handleBuyClick}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 font-medium mt-6">
          No tickets available for this draw.
        </p>
      )}

      {/* 🎟️ Purchase Modal */}
      {isModalOpen && selectedTicket && (
        <BuyTicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          price={selectedTicket.price}
          ticket={selectedTicket}
          onConfirm={handleConfirmPurchase}
          purchasedTickets={purchasedTickets}
        />
      )}
    </div>
  );
};

export default BuyTicketPage;
