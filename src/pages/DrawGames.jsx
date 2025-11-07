import React from "react";
import { useNavigate } from "react-router-dom";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";

// 🎯 Fixed draw times (with optional minutes)
const drawTimes = ["11:00 AM", "12:45 PM", "1:00 PM", "3:00 PM", "5:00 PM"];

// 💰 Ticket options
const quickDrawTickets = [
  { price: 6, prizeValue: "50,000" },
  { price: 10, prizeValue: "1,00,000" },
  { price: 20, prizeValue: "2,50,000" },
  { price: 100, prizeValue: "10,00,000" },
];

const DrawGames = () => {
  const navigate = useNavigate();

  // 🔢 Convert "12:45 PM" → total minutes
  const parseTimeToMinutes = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (isNaN(minutes)) minutes = 0;
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // 🕐 Get nearest upcoming draw time
  const getNearestDraw = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const upcoming = drawTimes.find((t) => parseTimeToMinutes(t) > currentMinutes);

    if (upcoming) {
      return { date: now, time: upcoming };
    } else {
      // All draws passed, pick tomorrow’s first
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      return { date: tomorrow, time: drawTimes[0] };
    }
  };

  const { date: drawDateObj, time: nearestTime } = getNearestDraw();
  const drawDate = drawDateObj.toISOString().split("T")[0];
  const drawDay = drawDateObj
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  // 🎟️ Map all ticket types with the upcoming draw info
  const tickets = quickDrawTickets.map((ticket, idx) => ({
    id: `10000`,
    drawNumber: 200 + idx,
    price: ticket.price,
    prizeValue: ticket.prizeValue,
    drawDate,
    drawTime: nearestTime,
    drawDay,
  }));

  // 🛒 Navigate to ticket purchase page
  const handleBuyClick = (ticket) => {
    navigate("/buy-ticket", {
      state: { price: ticket.price, prizeValue: ticket.prizeValue },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* 🎟️ Ticket Cards */}
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl">
        {tickets.map((ticket) => (
          <LotteryTicket
            key={ticket.price}
            {...ticket}
            canPurchase={true}
            loading={false}
            onBuyClick={handleBuyClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DrawGames;
