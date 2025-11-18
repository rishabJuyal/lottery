import React, { useState } from "react";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";

const ResultPage = () => {
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

    // 🧩 Dummy data (only today & yesterday)
    const winnersData = {
        "6": [
            { id: "60001", drawNumber: 301, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "11 AM" },
            { id: "60002", drawNumber: 302, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "1 PM" },
            { id: "60003", drawNumber: 303, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "3 PM" },
            { id: "60004", drawNumber: 304, prizeValue: "1,00,000", drawDate: todayStr, drawTime: "5 PM" },
            { id: "60005", drawNumber: 305, prizeValue: "1,00,000", drawDate: yesterdayStr, drawTime: "5 PM" },
        ],
        "10": [
            { id: "10001", drawNumber: 401, prizeValue: "5,00,000", drawDate: todayStr, drawTime: "11 AM" },
            { id: "10002", drawNumber: 402, prizeValue: "5,00,000", drawDate: todayStr, drawTime: "1 PM" },
            { id: "10003", drawNumber: 403, prizeValue: "5,00,000", drawDate: todayStr, drawTime: "3 PM" },
            { id: "10004", drawNumber: 404, prizeValue: "5,00,000", drawDate: yesterdayStr, drawTime: "1 PM" },
            { id: "10005", drawNumber: 405, prizeValue: "5,00,000", drawDate: yesterdayStr, drawTime: "3 PM" },
        ],
        "20": [
            { id: "20001", drawNumber: 501, prizeValue: "10,00,000", drawDate: todayStr, drawTime: "11 AM" },
            { id: "20002", drawNumber: 502, prizeValue: "10,00,000", drawDate: todayStr, drawTime: "3 PM" },
            { id: "20003", drawNumber: 503, prizeValue: "10,00,000", drawDate: yesterdayStr, drawTime: "11 AM" },
            { id: "20004", drawNumber: 504, prizeValue: "10,00,000", drawDate: yesterdayStr, drawTime: "3 PM" },
        ],
        "100": [
            { id: "100001", drawNumber: 701, prizeValue: "50,00,000", drawDate: todayStr, drawTime: "1 PM" },
            { id: "100002", drawNumber: 702, prizeValue: "50,00,000", drawDate: todayStr, drawTime: "5 PM" },
            { id: "100003", drawNumber: 703, prizeValue: "50,00,000", drawDate: yesterdayStr, drawTime: "11 AM" },
            { id: "100004", drawNumber: 704, prizeValue: "50,00,000", drawDate: yesterdayStr, drawTime: "3 PM" },
        ],
    };

    const [activePrice, setActivePrice] = useState(prices[0]);
    const [selectedDate, setSelectedDate] = useState(todayStr); // Default to current date

    // 🧮 Convert drawDate + drawTime → Date object
    const parseDateTime = (dateStr, timeStr) => {
        const [day, month, year] = dateStr.split("/");
        const [time, meridian] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (meridian === "PM" && hours < 12) hours += 12;
        if (meridian === "AM" && hours === 12) hours = 0;
        return new Date(year, month - 1, day, hours, minutes || 0);
    };

    // 🔄 Sort & filter winners by date
    const sortedWinners =
        winnersData[activePrice]
            ?.filter((w) => w.drawDate === selectedDate)
            .sort(
                (a, b) =>
                    parseDateTime(b.drawDate, b.drawTime) -
                    parseDateTime(a.drawDate, a.drawTime)
            ) || [];

    return (
        <div
            className="pb-4 min-h-[calc(100vh-160px)] bg-orange-100"
        >
            {/* Price Tabs + Date Selector (in one line) */}
            {/* Tabs & Date Selector */}
            <div
                style={{ background: "var(--bg-gradient)" }}
                className="flex items-center justify-between px-1 py-2 mb-4">
                {/* Price Tabs */}
                <div className="flex gap-2 scrollbar-hide">
                    {prices.map((price) => (
                        <button
                            key={price}
                            onClick={() => setActivePrice(price)}
                            className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 border 
  ${activePrice === price
                                    ? "text-red-700 border-orange-200 shadow-inner"
                                    : "text-gray-700 border-yellow-300 hover:bg-yellow-50"
                                }`}
                            style={
                                activePrice === price
                                    ? {
                                        background:
                                            "radial-gradient(circle at center, #ffef9a 0%, #ffdb58 50%, #f6c41c 100%)",
                                        boxShadow:
                                            "0 1px 4px rgba(0,0,0,0.15), inset 0 2px 8px rgba(255,255,255,0.5)",
                                        color: "#a20604",
                                        fontWeight: 700,
                                    }
                                    : { background: "#fff" }
                            }

                        >
                            ₹{price}
                        </button>
                    ))}
                </div>

                {/* Date Selector */}
                {/* Date Selector (Scroll picker on mobile) */}
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
                        className="w-26 text-xs font-medium border border-yellow-600 px-2 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                    />
                </div>

            </div>

            {/* Winners List */}
            <div className="flex flex-col gap-2">
                {sortedWinners.length > 0 ? (
                    sortedWinners.map((winner) => (
                        <div
                            key={winner.id}
                            className="bg-amber-300 mx-auto pt-1 rounded shadow-sm"
                        >
                            <p className="px-2 text-right text-gray-800 text-[10px] font-bold">
                                Draw Date: {winner.drawDate} — Time: {winner.drawTime}
                            </p>

                            <LotteryTicket
                                id={winner.id}
                                drawNumber={winner.drawNumber}
                                price={activePrice}
                                prizeValue={winner.prizeValue}
                                drawDate={winner.drawDate}
                                drawTime={winner.drawTime}
                                drawDay={new Date(
                                    winner.drawDate.split("/").reverse().join("-")
                                )
                                    .toLocaleDateString("en-US", { weekday: "long" })
                                    .toUpperCase()}
                                canPurchase={false}
                                loading={false}
                                onBuyClick={() => { }}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-xs mt-4">
                        No results found for this date.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResultPage;
