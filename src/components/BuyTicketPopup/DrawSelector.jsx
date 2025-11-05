// src/components/BuyTicketPopup/DrawSelector.jsx
import React, { useEffect, useState } from "react";

const DrawSelector = ({
  drawTimes,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}) => {
  const parseTimeToMinutes = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (isNaN(minutes)) minutes = 0;
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const today = new Date().toISOString().split("T")[0];
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const filtered = drawTimes.filter((time) => {
      if (selectedDate !== today) return true;
      return parseTimeToMinutes(time) > currentMinutes;
    });

    setAvailableTimes(filtered.length > 0 ? filtered : drawTimes);
  }, [selectedDate, drawTimes, today]);

  return (
    <div
      className="w-[320px] max-w-md p-2 shadow-lg"
      style={{
        background: "linear-gradient(180deg, #b40c02 0%, #f46d04 100%)",
        border: "3px solid #ffed33",
        borderRadius: "0", // 🔥 No rounded corners
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
        {/* Time Dropdown */}
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
              borderRadius: "0", // 🔥 edgy flat look
              cursor: "pointer",
              outlineColor: "#e63820",
            }}
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value)}
          >
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
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
              borderRadius: "0", // 🔥 edgy
              cursor: "pointer",
              outlineColor: "#e63820",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DrawSelector;
