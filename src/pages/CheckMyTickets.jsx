import React, { useState, useEffect, useMemo } from "react";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";
import api from "../services/api";

const CheckMyTickets = () => {
  const statusOptions = ["all", "won", "lost", "pending", "unclaimed"];

  const today = new Date();
  const formatDate = (date) =>
    `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  const todayStr = formatDate(today);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePrice, setActivePrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [statusFilter, setStatusFilter] = useState("all");

  const parseDateTime = (dateStr, timeStr) => {
    const [year, month, day] = dateStr.split("-");
    const [hours, minutes, seconds] = timeStr.split(":");
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  // Convert 24h time to 12h AM/PM
  const formatTime12Hour = (time24) => {
    const [hourStr, min] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 → 12
    return `${hour}:${min} ${ampm}`;
  };

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo?.userId) return;

        const response = await api.get(`/gamma/lottery/my-tickets`);
        const data = response.tickets || [];

        const mappedTickets = data.map((t) => ({
          id: t.ticketNumber,
          drawNumber: t.slotCode,
          price: t.denomination,
          prizeValue: t.prizePool || 100000,
          drawDate: t.lotteryDate.split("-").reverse().join("/"),
          drawTime: formatTime12Hour(t.timeSlot.slice(0, 5)), // FIXED
          won: t.status === "CLAIMED",
          loss: t.status === "EXPIRED",
          pending: t.status === "ACTIVE",
          unclaimed: t.status === "WINNER",
        }));

        setTickets(mappedTickets);

        const uniquePrices = [
          "all",
          ...new Set(mappedTickets.map((t) => t.price.toString())),
        ].sort((a, b) => (a === "all" ? -1 : Number(a) - Number(b)));

        setActivePrice(uniquePrices[0] || "all");
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Filter & sort tickets
  const sortedTickets =
    tickets
      ?.filter((ticket) => {
        if (activePrice !== "all" && ticket.price.toString() !== activePrice)
          return false;
        if (ticket.drawDate !== selectedDate) return false;

        if (statusFilter === "won" && !ticket.won) return false;
        if (statusFilter === "lost" && !ticket.loss) return false;
        if (statusFilter === "pending" && !ticket.pending) return false;
        if (statusFilter === "unclaimed" && !ticket.unclaimed) return false;

        return true;
      })
      .sort(
        (a, b) =>
          parseDateTime(b.drawDate.split("/").reverse().join("-"), b.drawTime) -
          parseDateTime(a.drawDate.split("/").reverse().join("-"), a.drawTime)
      ) || [];

  const prices = useMemo(() => {
    const unique = [...new Set(tickets.map((t) => t.price.toString()))].sort(
      (a, b) => Number(a) - Number(b)
    );
    return ["all", ...unique];
  }, [tickets]);

  // Gradient style for dropdown wrapper
  const gradient = {
    background:
      "radial-gradient(circle at center, #ffef9a 0%, #ffdb58 50%, #f6c41c 100%)",
  };

  return (
    <div className="pb-4 min-h-screen">
      <div style={{ background: "var(--bg-gradient)" }} className="px-1 py-2 mb-4 space-y-2">

        {/* Price + Status */}
        <div className="flex items-center gap-3">

          {/* PRICE DROPDOWN */}
          <div className="flex flex-col w-1/2">
            <label className="text-[12px] font-bold text-gray-100">PRICE :</label>

            <div className="rounded border border-yellow-600 shadow-sm" style={gradient}>
              <select
                value={activePrice}
                onChange={(e) => setActivePrice(e.target.value)}
                className="w-full text-xs px-2 py-1 bg-transparent text-red-800 font-semibold"
              >
                {prices.map((price) => (
                  <option key={price} value={price} className="text-black">
                    {price === "all" ? "All" : `₹${price}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* STATUS DROPDOWN */}
          <div className="flex flex-col w-1/2">
            <label className="text-[12px] font-bold text-gray-100">STATUS :</label>

            <div className="rounded border border-yellow-600 shadow-sm" style={gradient}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-xs px-2 py-1 bg-transparent text-red-800 font-semibold"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status} className="text-black">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="mt-2 w-full">
          <input
            type="date"
            value={(() => {
              const [d, m, y] = selectedDate.split("/");
              return `${y}-${m}-${d}`;
            })()}
            onChange={(e) => {
              const [y, m, d] = e.target.value.split("-");
              setSelectedDate(`${d}/${m}/${y}`);
            }}
            className="w-full text-xs font-medium border border-yellow-600 px-2 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
          />
        </div>
      </div>

      {/* Ticket List */}
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading tickets...</p>
      ) : (
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
                  price={ticket.price}
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
              No tickets found for this date & status.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckMyTickets;
