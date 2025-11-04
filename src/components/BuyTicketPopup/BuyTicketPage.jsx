import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LotteryTicket from "./LotteryTicket";
import BuyTicketModal from "./BuyTicketModal";

const BuyTicketPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🎯 get from location state or localStorage
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

  // 💾 persist values when coming from navigate()
  useEffect(() => {
    if (location.state?.price) {
      localStorage.setItem("ticketPrice", location.state.price);
    }
    if (location.state?.prizeValue) {
      localStorage.setItem("ticketPrizeValue", location.state.prizeValue);
    }
  }, [location.state]);

  // 🎯 fixed time options (with minutes)
  const drawTimes = ["11:05 AM", "12:15 PM", "1 PM", "3 PM", "5 PM"];

  // 🧾 states
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [drawDay, setDrawDay] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  // 🧾 modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // 🧮 helper → get weekday from date
  const getDayName = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();

  // 🧩 helper: convert "12:45 PM" → 24-hour minutes (e.g. 765)
  const parseTimeToMinutes = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (isNaN(minutes)) minutes = 0;

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  // 🧭 detect available time slots based on current time
  const getAvailableTimes = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return drawTimes.filter((time) => parseTimeToMinutes(time) > currentMinutes);
  };

  // 🕐 init default date/time
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);

    const availableTimes = getAvailableTimes();
    if (availableTimes.length > 0) {
      setSelectedTime(availableTimes[0]);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split("T")[0]);
      setSelectedTime(drawTimes[0]);
    }
  }, []);

  // 🧾 update draw day when date changes
  useEffect(() => {
    if (selectedDate) setDrawDay(getDayName(selectedDate));
  }, [selectedDate]);

  // simulate fetching purchased tickets
  const purchasedTickets = ["10005", "10010", "10025", "10030", "10050"];

  // 🎟️ auto-generate tickets whenever date or time changes
  useEffect(() => {
    if (!selectedDate || !selectedTime) return;
    setLoadingTickets(true);

    const timeout = setTimeout(() => {
      const initialId = 10000;
      const totalTickets = 100;
      const drawDateFormatted = new Date(selectedDate).toLocaleDateString("en-GB");

      // generate all tickets
      const generated = Array.from({ length: totalTickets }, (_, i) => ({
        id: (initialId + i).toString(),
        drawNumber: 200 + i,
        price,
        prizeValue,
        drawDate: drawDateFormatted,
        drawTime: selectedTime,
        drawDay,
      }));

      // ❌ filter out purchased ones
      const availableTickets = generated.filter(
        (ticket) => !purchasedTickets.includes(ticket.id)
      );

      setTickets(availableTickets);
      setLoadingTickets(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [selectedDate, selectedTime, drawDay, price, prizeValue]);

  // 🎯 when BUY button clicked on a ticket
  const handleBuyClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // 🎯 handle purchase confirmation
  const handleConfirmPurchase = () => {
    alert(`🎟️ Ticket ${selectedTicket.id} purchased successfully for ₹${selectedTicket.price}`);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      {/* 🎯 selection inputs */}
      <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-md mb-6">
        {/* date */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Select Draw Date :
          </label>
          <input
            type="date"
            className="w-full border rounded-md p-2 text-sm"
            min={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* time */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Select Draw Time:
          </label>
          <div className="flex flex-wrap gap-3">
            {drawTimes.map((time) => {
              const now = new Date();
              const isToday =
                selectedDate === new Date().toISOString().split("T")[0];

              const currentMinutes = now.getHours() * 60 + now.getMinutes();
              const drawMinutes = parseTimeToMinutes(time);
              const isPast = isToday && drawMinutes <= currentMinutes;

              return (
                <button
                  key={time}
                  onClick={() => !isPast && setSelectedTime(time)}
                  disabled={isPast}
                  className={`px-3 py-2 rounded-md text-sm font-semibold border transition ${
                    selectedTime === time
                      ? "bg-green-600 text-white border-green-600"
                      : "border-gray-300 hover:bg-green-100"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ⏳ Loading spinner */}
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

      {/* 🎟️ Centralized Modal */}
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
