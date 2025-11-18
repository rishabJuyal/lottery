import React, { useEffect, useState } from "react";

const DrawSelector = ({
    drawTimes,
    selectedDate,
    selectedTime,
    selectedPrice,
    onDateChange,
    onTimeChange,
    onPriceChange,
}) => {
    const today = new Date().toISOString().split("T")[0];
    const [availableTimes, setAvailableTimes] = useState([]);

    /** Helper: convert "HH:MM" to minutes for sorting */
    const toMinutes = (t) => {
        const [h, m] = t.value.split(":").map(Number);
        return h * 60 + m;
    };

    /** Filter & sort times based on selected date */
    useEffect(() => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        let filtered =
            selectedDate !== today
                ? drawTimes
                : drawTimes.filter((slot) => toMinutes(slot) > currentMinutes);

        // Sort by time
        filtered.sort((a, b) => toMinutes(a) - toMinutes(b));

        setAvailableTimes(filtered.length ? filtered : drawTimes.sort((a, b) => toMinutes(a) - toMinutes(b)));
    }, [selectedDate, drawTimes]);

    /** Denominations for selected time */
    const denominations =
        drawTimes
            .find((t) => t.value === selectedTime)
            ?.denominations?.map((d) => d.denomination) || [];

    return (
        <div
            className="w-[320px] max-w-md p-2 shadow-lg m-auto mt-2"
            style={{
                background: "linear-gradient(180deg, #b40c02 0%, #f46d04 100%)",
                border: "3px solid #ffed33",
                borderRadius: "0",
                boxShadow: "0 4px 12px rgba(164, 6, 4, 0.4)",
            }}
        >
            <label
                className="block text-lg font-bold uppercase text-center mb-4"
                style={{
                    color: "#ffed33",
                    letterSpacing: "0.1em",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
                }}
            >
                Draw Selection
            </label>

            <div className="flex items-center gap-4">
                {/* TIME DROPDOWN */}
                <div className="flex-1">
                    <label
                        className="block text-xs font-semibold mb-1 uppercase"
                        style={{ color: "#ffe19c" }}
                    >
                        Time
                    </label>
                    <select
                        className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
                        style={{
                            backgroundColor: "#f9a664",
                            border: "2px solid #f46d04",
                            color: "#a20604",
                            borderRadius: "0",
                            cursor: "pointer",
                            outlineColor: "#e63820",
                        }}
                        value={selectedTime}
                        onChange={(e) => onTimeChange(e.target.value)}
                    >
                        {availableTimes.map((slot, idx) => (
                            <option key={`${slot.value}-${idx}`} value={slot.value}>
                                {slot.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DATE PICKER */}
                <div className="flex-1">
                    <label
                        className="block text-xs font-semibold mb-1 uppercase"
                        style={{ color: "#ffe19c" }}
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
                        style={{
                            backgroundColor: "#f9a664",
                            border: "2px solid #f46d04",
                            color: "#a20604",
                            borderRadius: "0",
                            cursor: "pointer",
                            outlineColor: "#e63820",
                        }}
                    />
                </div>
            </div>

            {/* PRICE DROPDOWN */}
            <div className="mt-4">
                <label
                    className="block text-xs font-semibold mb-1 uppercase"
                    style={{ color: "#ffe19c" }}
                >
                    PRICE (₹)
                </label>

                <select
                    className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
                    style={{
                        backgroundColor: "#f9a664",
                        border: "2px solid #f46d04",
                        color: "#a20604",
                        borderRadius: "0",
                        cursor: "pointer",
                        outlineColor: "#e63820",
                    }}
                    value={selectedPrice}
                    onChange={(e) => onPriceChange(Number(e.target.value))}
                >
                    {denominations.map((price) => (
                        <option key={price} value={price}>
                            {price}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DrawSelector;
