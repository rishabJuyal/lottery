import React from "react";
import { useNavigate } from "react-router-dom";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";

// 🎟️ QUICK DRAW TICKETS DATA
const drawTimes = ["11 AM", "1 PM", "3 PM", "5 PM"];
const quickDrawTickets = [
  { price: 6, prizeValue: "50,000" },
  { price: 10, prizeValue: "1,00,000" },
  { price: 20, prizeValue: "2,50,000" },
  { price: 100, prizeValue: "10,00,000" },
];

const DrawGames = () => {
  const navigate = useNavigate();

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const nearestTime =
    drawTimes.find((time) => parseInt(time) > now.getHours()) || drawTimes[0];

  const tickets = quickDrawTickets.map((ticket, idx) => ({
    id: `10000`,
    drawNumber: 200 + idx,
    price: ticket.price,
    prizeValue: ticket.prizeValue,
    drawDate: today,
    drawTime: `${nearestTime} ONWARDS`,
    drawDay: new Date(today)
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase(),
  }));

  const handleBuyClick = (ticket) => {
    navigate("/buy-ticket", {
      state: { price: ticket.price, prizeValue: ticket.prizeValue },
    });
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
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
