import React, { useState, useEffect, useMemo } from "react";
import LotteryTicket from "../components/BuyTicketPopup/LotteryTicket";
import api from "../services/api";

const ResultPage = () => {
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activePrice, setActivePrice] = useState("all");
    const [selectedDate, setSelectedDate] = useState("");

    // ---------- Date helpers ----------
    const formatDisplay = (iso) => {
        const [y, m, d] = iso.split("-");
        return `${d}/${m}/${y}`;
    };

    const formatToISO = (ddmmyyyy) => {
        const [d, m, y] = ddmmyyyy.split("/");
        return `${y}-${m}-${d}`;
    };

    const today = new Date();
    const todayStr = `${String(today.getDate()).padStart(2, "0")}/${String(
        today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;
    useEffect(() => setSelectedDate(todayStr), []);

    // ---------- Time formatting ----------
    const formatTime12Hour = (time24) => {
        const [hourStr, min] = time24.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${min} ${ampm}`;
    };

    // --------- FALLBACK JSON ----------
    const fallbackJSON = {
        startDate: "2025-11-24",
        endDate: "2025-11-30",
        totalDays: 7,
        dailyWinners: [
            {
                date: "2025-11-30",
                winners: [
                    {
                        lotteryId: 1,
                        lotteryNumber: "20251130-01-11",
                        lotteryDate: "2025-11-30",
                        timeSlot: "14:00:00",
                        denomination: 11,
                        prizePool: 15000,
                        winningTicketNumber: "1A100005",
                    },
                ],
            },
        ],
    };

    // ---------- API Call ----------
    useEffect(() => {
        const fetchWinners = async () => {
            try {
                setLoading(true);

                const response = await api.get("/gamma/lottery/winners/history");
                const apiData = response?.dailyWinners || fallbackJSON.dailyWinners;

                const mapped = [];

                apiData.forEach((day) => {
                    const formattedDate = formatDisplay(day.date);

                    day.winners.forEach((w) => {
                        mapped.push({
                            id: w.winningTicketNumber,
                            drawNumber: w.lotteryNumber,
                            price: w.denomination.toString(),
                            prizeValue: w.prizePool.toLocaleString(),
                            drawDate: formattedDate,
                            drawTime: formatTime12Hour(w.timeSlot.slice(0, 5)),
                        });
                    });
                });

                setWinners(mapped);
            } catch (err) {
                console.log("API failed, using fallback JSON");

                const mapped = [];

                fallbackJSON.dailyWinners.forEach((day) => {
                    const formattedDate = formatDisplay(day.date);

                    day.winners.forEach((w) => {
                        mapped.push({
                            id: w.winningTicketNumber,
                            drawNumber: w.lotteryNumber,
                            price: w.denomination.toString(),
                            prizeValue: w.prizePool.toLocaleString(),
                            drawDate: formattedDate,
                            drawTime: formatTime12Hour(w.timeSlot.slice(0, 5)),
                        });
                    });
                });

                setWinners(mapped);
            } finally {
                setLoading(false);
            }
        };

        fetchWinners();
    }, []);

    // ---------- PRICE FILTER OPTIONS ----------
    const prices = useMemo(() => {
        const unique = [...new Set(winners.map((w) => w.price))].sort(
            (a, b) => Number(a) - Number(b)
        );
        return ["all", ...unique];
    }, [winners]);

    // ---------- Sorting ----------
    const parseDateTime = (ddmmyyyy, time12) => {
        const iso = formatToISO(ddmmyyyy);
        const dateObj = new Date(`${iso} ${time12}`);
        return dateObj;
    };

    const filteredWinners =
        winners
            .filter((w) => {
                if (activePrice !== "all" && w.price !== activePrice) return false;
                return w.drawDate === selectedDate;
            })
            .sort(
                (a, b) =>
                    parseDateTime(b.drawDate, b.drawTime) -
                    parseDateTime(a.drawDate, a.drawTime)
            ) || [];

    // ---------- UI ----------
    return (
        <div className="pb-4 min-h-[calc(100vh-160px)] bg-orange-100">

            {/* Price tabs + date selector */}
            <div
                style={{ background: "var(--bg-gradient)" }}
                className="flex items-center justify-between px-1 py-2 mb-4"
            >
                {/* Prices */}
                <div className="flex gap-2 scrollbar-hide">
                    {prices.map((p) => (
                        <button
                            key={p}
                            onClick={() => setActivePrice(p)}
                            className={`px-3 py-1.5 text-xs font-semibold transition-all border ${
                                activePrice === p
                                    ? "text-red-700 border-orange-200 shadow-inner"
                                    : "text-gray-700 border-yellow-300 hover:bg-yellow-50"
                            }`}
                            style={
                                activePrice === p
                                    ? {
                                          background:
                                              "radial-gradient(circle, #ffef9a, #ffdb58 50%, #f6c41c)",
                                          boxShadow:
                                              "0 1px 4px rgba(0,0,0,0.15), inset 0 2px 8px rgba(255,255,255,0.5)",
                                          color: "#a20604",
                                      }
                                    : { background: "#fff" }
                            }
                        >
                            {p === "all" ? "All" : `₹${p}`}
                        </button>
                    ))}
                </div>

                {/* Date Picker */}
                <input
                    type="date"
                    value={formatToISO(selectedDate)}
                    onChange={(e) => {
                        const [y, m, d] = e.target.value.split("-");
                        setSelectedDate(`${d}/${m}/${y}`);
                    }}
                    className="text-xs border border-yellow-600 px-2 py-1.5 bg-white shadow-sm"
                />
            </div>

            {/* Winners List */}
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {filteredWinners.length > 0 ? (
                        filteredWinners.map((w) => (
                            <div key={w.id} className="bg-amber-300 mx-auto pt-1 rounded shadow-sm">
                                <p className="px-2 text-right text-gray-800 text-[10px] font-bold">
                                    Draw Date: {w.drawDate} — Time: {w.drawTime}
                                </p>

                                <LotteryTicket
                                    id={w.id}
                                    drawNumber={w.slotCode}
                                    price={w.price}
                                    prizeValue={w.prizeValue}
                                    drawDate={w.drawDate}
                                    drawTime={w.drawTime}
                                    drawDay={new Date(formatToISO(w.drawDate)).toLocaleDateString(
                                        "en-US",
                                        { weekday: "long" }
                                    )}
                                    canPurchase={false}
                                    loading={false}
                                    onBuyClick={() => {}}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-xs mt-4">
                            No results found for this date.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultPage;
