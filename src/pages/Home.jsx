import React from "react";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";
import ScratchTicketCard from "../components/ScratchCard";
import lotteryLogo from "../assets/lottery-logo.png";

import ScratchCard1 from "../assets/scratch-card-1.png";
import ScratchCard2 from "../assets/scratch-card-2.png";
import ScratchCard3 from "../assets/scratch-card-3.png";

import poster from "../assets/poster.png";
import { useNavigate } from "react-router-dom";

const scratchTicketsData = [
  {
    id: "#2671",
    price: "$20",
    imageUrl: ScratchCard1,
    startDate: "10/20/25",
  },
  {
    id: "#2693",
    price: "$5",
    imageUrl: ScratchCard2,
    startDate: "10/20/25",
  },
  {
    id: "#2689",
    price: "$2",
    imageUrl: ScratchCard3,
    startDate: "10/20/25",
  },
];

const Home = () => {
  const navigate = useNavigate();

  // 🎟️ QUICK DRAW TICKETS
  const drawTimes = ["11 AM", "1 PM", "3 PM", "5 PM"];
  const quickDrawTickets = [
    { price: 6, prizeValue: "50,000" },
    { price: 10, prizeValue: "1,00,000" },
    { price: 20, prizeValue: "2,50,000" },
    { price: 100, prizeValue: "10,00,000" },
  ];

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
    // On Home.js / LotteryTicket click
navigate("/buy-ticket", {
    state: { price: ticket.price, prizeValue: ticket.prizeValue },
  });
  
  };

  return (
    <div className="bg-white min-h-screen">
      <img
        src={poster}
        className="bg-blue-300 flex w-full h-auto mb-4"
        alt="Poster"
      />

      <div className="p-3 space-y-2">
        {/* 🎟️ DRAW GAMES Section */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-[14px] flex items-center h-6 m-0">
              DRAW GAMES
            </h2>

            <button
              onClick={() => navigate("/draw-games")}
              className="text-[12px] text-blue-600 font-semibold hover:underline"
            >
              View All &gt;
            </button>
          </div>

          <div className="flex space-x-3 overflow-x-auto p-4 pt-1 -mx-3">
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
        </section>

        {/* 🃏 SCRATCH CARDS Section */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-[14px] flex items-center h-6 m-0">
              SCRATCH CARDS
            </h2>

            <button className="text-[12px] text-blue-600 font-semibold hover:underline">
              View All &gt;
            </button>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {scratchTicketsData.map((ticket, idx) => (
              <ScratchTicketCard key={idx} {...ticket} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
