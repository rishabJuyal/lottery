// 📁 pages/CheckMyTickets.jsx
import React, { useState } from "react";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";

const CheckMyTickets = () => {
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
      { id: "60001", drawNumber: 301, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "11 AM", won: true, loss: false, pending: false, unclaimed: false },
      { id: "60002", drawNumber: 302, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "1 PM", won: false, loss: true, pending: false, unclaimed: false },
      { id: "60003", drawNumber: 303, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "3 PM", won: false, loss: false, pending: true, unclaimed: false },
      { id: "60004", drawNumber: 304, prizeValue: "1,00,000", drawDate: yesterdayStr, drawTime: "5 PM", won: false, loss: false, pending: false, unclaimed: true },
    ],
    "10": [
      { id: "10001", drawNumber: 401, prizeValue: "5,00,000", drawDate: todayStr, drawTime: "11 AM", won: false, loss: true, pending: false, unclaimed: false },
      { id: "10002", drawNumber: 402, prizeValue: "5,00,000", drawDate: todayStr, drawTime: "1 PM", won: false, loss: false, pending: true, unclaimed: false },
      { id: "10003", drawNumber: 403, prizeValue: "5,00,000", drawDate: todayStr, drawTime: "3 PM", won: true, loss: false, pending: false, unclaimed: false },
      { id: "10004", drawNumber: 404, prizeValue: "5,00,000", drawDate: yesterdayStr, drawTime: "1 PM", won: false, loss: false, pending: false, unclaimed: true },
    ],
    "20": [
      { id: "20001", drawNumber: 501, prizeValue: "10,00,000", drawDate: todayStr, drawTime: "11 AM", won: false, loss: false, pending: true, unclaimed: false },
      { id: "20002", drawNumber: 502, prizeValue: "10,00,000", drawDate: todayStr, drawTime: "3 PM", won: true, loss: false, pending: false, unclaimed: false },
      { id: "20003", drawNumber: 503, prizeValue: "10,00,000", drawDate: yesterdayStr, drawTime: "11 AM", won: false, loss: true, pending: false, unclaimed: false },
      { id: "20004", drawNumber: 504, prizeValue: "10,00,000", drawDate: yesterdayStr, drawTime: "3 PM", won: false, loss: false, pending: false, unclaimed: true },
    ],
    "100": [
      { id: "100001", drawNumber: 701, prizeValue: "50,00,000", drawDate: todayStr, drawTime: "1 PM", won: true, loss: false, pending: false, unclaimed: false },
      { id: "100002", drawNumber: 702, prizeValue: "50,00,000", drawDate: todayStr, drawTime: "5 PM", won: false, loss: false, pending: true, unclaimed: false },
      { id: "100003", drawNumber: 703, prizeValue: "50,00,000", drawDate: yesterdayStr, drawTime: "11 AM", won: false, loss: true, pending: false, unclaimed: false },
      { id: "100004", drawNumber: 704, prizeValue: "50,00,000", drawDate: yesterdayStr, drawTime: "3 PM", won: false, loss: false, pending: false, unclaimed: true },
    ],
  };

  const [activePrice, setActivePrice] = useState(prices[0]);
  const [selectedDate, setSelectedDate] = useState(todayStr); // Default to today

  // 🧮 Convert drawDate + drawTime → Date object
  const parseDateTime = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split("/");
    const [time, meridian] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian === "PM" && hours < 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    return new Date(year, month - 1, day, hours, minutes || 0);
  };

  // 🔄 Sort & filter tickets by date
  const sortedTickets =
    ticketsData[activePrice]
      ?.filter((ticket) => ticket.drawDate === selectedDate)
      .sort(
        (a, b) =>
          parseDateTime(b.drawDate, b.drawTime) - parseDateTime(a.drawDate, a.drawTime)
      ) || [];

  return (
    <div className="bg-gray-100 py-4 min-h-screen">
      {/* Tabs + Date Selector */}
      <div className="flex items-center justify-between px-1 mb-4">
        {/* Price Tabs */}
        <div className="flex gap-2 scrollbar-hide">
          {prices.map((price) => (
            <button
              key={price}
              onClick={() => setActivePrice(price)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activePrice === price
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"
              }`}
            >
              ₹{price}
            </button>
          ))}
        </div>

        {/* Date Selector */}
        <div className="ml-2">
          <input
            type="date"
            value={(() => {
              const [day, month, year] = selectedDate.split("/");
              return `${year}-${month}-${day}`;
            })()}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split("-");
              setSelectedDate(`${day}/${month}/${year}`);
            }}
            max={new Date().toISOString().split("T")[0]} // prevent future dates
            className="w-26 text-xs font-medium border border-gray-300 rounded-full px-2 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none"
          />
        </div>
      </div>

      {/* Ticket List */}
      <div className="flex flex-col gap-2">
        {sortedTickets.length > 0 ? (
          sortedTickets.map((ticket) => (
            <div key={ticket.id} className="bg-amber-300 mx-auto pt-1 rounded shadow-sm">
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
                canPurchase={false}
                loading={false}
                onBuyClick={() => {}}
                won={ticket.won}
                loss={ticket.loss}
                pending={ticket.pending}
                unclaimed={ticket.unclaimed}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xs mt-4">
            No tickets found for this date.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckMyTickets;
