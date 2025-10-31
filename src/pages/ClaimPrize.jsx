import React, { useState } from "react";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";

const ClaimPrize = () => {
  const prices = ["6", "10", "20", "100"];

  // 🗓️ Get today's and yesterday's date
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (date) =>
    `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;

  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);

  // 🧩 Dummy Ticket History Data
  const ticketsData = {
    "6": [
      { id: "60001", drawNumber: 301, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "11 AM", won: false, loss: false, pending: false, unclaimed: true },
      { id: "60002", drawNumber: 302, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "1 PM", won: false, loss: true, pending: false, unclaimed: false },
    ],
    "10": [
      { id: "10001", drawNumber: 401, prizeValue: "5,00,000", drawDate: todayStr, drawTime: "3 PM", won: false, loss: false, pending: false, unclaimed: true },
      { id: "10002", drawNumber: 402, prizeValue: "5,00,000", drawDate: yesterdayStr, drawTime: "5 PM", won: false, loss: true, pending: false, unclaimed: false },
    ],
    "20": [
      { id: "20001", drawNumber: 501, prizeValue: "10,00,000", drawDate: yesterdayStr, drawTime: "11 AM", won: false, loss: false, pending: false, unclaimed: true },
    ],
    "100": [
      { id: "100001", drawNumber: 701, prizeValue: "50,00,000", drawDate: yesterdayStr, drawTime: "1 PM", won: true, loss: false, pending: false, unclaimed: false },
    ],
  };

  const [activePrice, setActivePrice] = useState(prices[0]);

  // 🎟️ Filter only unclaimed tickets
  const unclaimedTickets = Object.values(ticketsData)
    .flat()
    .filter((ticket) => ticket.unclaimed);

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <h1 className="text-center text-lg font-bold text-green-700 mb-4">
        🎁 Claim Your Prize
      </h1>

      {unclaimedTickets.length > 0 ? (
        <div className="flex flex-col gap-3 items-center">
          {unclaimedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-amber-300 mx-auto pt-1 rounded shadow-sm w-fit"
            >
              <p className="px-2 text-right text-gray-800 text-[10px] font-bold">
                Draw Date: {ticket.drawDate} — Time: {ticket.drawTime}
              </p>

              <LotteryTicket
                id={ticket.id}
                drawNumber={ticket.drawNumber}
                price={activePrice}
                prizeValue={ticket.prizeValue}
                drawDate={ticket.drawDate}
                drawTime={ticket.drawTime}
                drawDay={new Date(ticket.drawDate.split("/").reverse().join("-"))
                  .toLocaleDateString("en-US", { weekday: "long" })
                  .toUpperCase()}
                won={ticket.won}
                loss={ticket.loss}
                pending={ticket.pending}
                unclaimed={ticket.unclaimed}
                canPurchase={false}
                loading={false}
                onBuyClick={() => alert(`Claim started for ticket ${ticket.id}`)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-sm mt-10">
          ❌ No prize available to claim.
        </p>
      )}
    </div>
  );
};

export default ClaimPrize;
