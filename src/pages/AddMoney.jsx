import React, { useState } from "react";
import { Wallet, IndianRupee, Receipt, ImageUp } from "lucide-react"; // Lucide icons

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }
    alert("Money added request submitted!");
    // Handle upload logic here (e.g. send data to backend)
  };

  return (
    <div
      className="min-h-[calc(100vh-124px)] flex items-center justify-center p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 shadow-lg"
        style={{
          backgroundColor: "#fff7da", // light cream tone
          border: "3px solid #a20604",
          borderRadius: "0",
          boxShadow: "0 6px 16px rgba(164, 6, 4, 0.4)",
        }}
      >
        <h2
          className="text-center text-[20px] text-nowrap font-bold uppercase mb-6 flex items-center justify-center gap-2"
          style={{
            color: "#a20604",
            letterSpacing: "0.1em",
          }}
        >
          <Wallet size={22} />
          Add Money
        </h2>

        {/* Amount Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-1 uppercase flex items-center gap-1"
            style={{ color: "#e63820" }}
          >
            <IndianRupee size={14} /> Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
            style={{
              backgroundColor: "#ffe3b3",
              border: "2px solid #f46d04",
              color: "#a20604",
              borderRadius: "0",
            }}
            placeholder="Enter amount"
          />
        </div>

        {/* Transaction ID */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-1 uppercase flex items-center gap-1"
            style={{ color: "#e63820" }}
          >
            <Receipt size={14} /> Transaction ID
          </label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
            style={{
              backgroundColor: "#ffe3b3",
              border: "2px solid #f46d04",
              color: "#a20604",
              borderRadius: "0",
            }}
            placeholder="Optional"
          />
        </div>

        {/* Screenshot Upload */}
        <div className="mb-6">
          <label
            className="block text-sm font-semibold mb-1 uppercase flex items-center gap-1"
            style={{ color: "#e63820" }}
          >
            <ImageUp size={14} /> Upload Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files[0])}
            className="w-full text-sm cursor-pointer"
            style={{
              backgroundColor: "#ffe3b3",
              border: "2px solid #f46d04",
              color: "#a20604",
              borderRadius: "0",
              padding: "8px",
            }}
          />
          {/* Preview if image uploaded */}
          {screenshot && (
            <div
              className="mt-3 border p-2 text-center"
              style={{
                border: "2px solid #f46d04",
                backgroundColor: "#fff3cd",
                borderRadius: "0",
              }}
            >
              <img
                src={URL.createObjectURL(screenshot)}
                alt="Screenshot Preview"
                className="mx-auto max-h-40 object-contain"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-sm font-bold uppercase flex items-center justify-center gap-2"
          style={{
            backgroundColor: "#a20604",
            color: "#ffed33",
            border: "2px solid #ffed33",
            borderRadius: "0",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#f46d04")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#a20604")
          }
        >
          <Wallet size={16} />
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMoney;
