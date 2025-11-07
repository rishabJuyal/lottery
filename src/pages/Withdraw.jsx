import React, { useState } from "react";
import { Banknote, IndianRupee, Landmark, Wallet } from "lucide-react"; // Lucide icons

const Withdraw = () => {
  const [tab, setTab] = useState("bank");
  const [amount, setAmount] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifsc: "",
    holderName: "",
  });
  const [upiId, setUpiId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }
    alert(
      `Withdrawal request submitted via ${tab === "bank" ? "Bank" : "UPI"}!`
    );
  };

  return (
    <div
      className="min-h-[calc(100vh-160px)] flex items-center justify-center p-6"
    >
      <div
        className="w-full max-w-md p-6 shadow-lg"
        style={{
          backgroundColor: "#fff7da",
          border: "3px solid #a20604",
          borderRadius: "0",
          boxShadow: "0 6px 16px rgba(164, 6, 4, 0.4)",
        }}
      >
        <h2
          className="text-center text-[20px] text-nowrap font-bold uppercase mb-6 flex items-center justify-center gap-2"
          style={{
            color: "#a20604",
            letterSpacing: "0.05em",
          }}
        >
          <Wallet size={22} />
          Withdraw Funds
        </h2>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            type="button"
            onClick={() => setTab("bank")}
            className="flex-1 py-2 text-sm font-bold uppercase flex items-center justify-center gap-2"
            style={{
              backgroundColor: tab === "bank" ? "#a20604" : "#f9a664",
              color: tab === "bank" ? "#ffed33" : "#a20604",
              border: "2px solid #f46d04",
              borderRadius: "0",
              cursor: "pointer",
            }}
          >
            <Landmark size={16} />
            Bank
          </button>
          <button
            type="button"
            onClick={() => setTab("upi")}
            className="flex-1 py-2 text-sm font-bold uppercase flex items-center justify-center gap-2"
            style={{
              backgroundColor: tab === "upi" ? "#a20604" : "#f9a664",
              color: tab === "upi" ? "#ffed33" : "#a20604",
              border: "2px solid #f46d04",
              borderRadius: "0",
              cursor: "pointer",
            }}
          >
            <Banknote size={16} />
            UPI
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Amount */}
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

          {/* Bank Fields */}
          {tab === "bank" && (
            <>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1 uppercase"
                  style={{ color: "#e63820" }}
                >
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={bankDetails.holderName}
                  onChange={(e) =>
                    setBankDetails({
                      ...bankDetails,
                      holderName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
                  style={{
                    backgroundColor: "#ffe3b3",
                    border: "2px solid #f46d04",
                    color: "#a20604",
                    borderRadius: "0",
                  }}
                  placeholder="Enter account holder name"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1 uppercase"
                  style={{ color: "#e63820" }}
                >
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) =>
                    setBankDetails({
                      ...bankDetails,
                      accountNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
                  style={{
                    backgroundColor: "#ffe3b3",
                    border: "2px solid #f46d04",
                    color: "#a20604",
                    borderRadius: "0",
                  }}
                  placeholder="Enter account number"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-semibold mb-1 uppercase"
                  style={{ color: "#e63820" }}
                >
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={bankDetails.ifsc}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, ifsc: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
                  style={{
                    backgroundColor: "#ffe3b3",
                    border: "2px solid #f46d04",
                    color: "#a20604",
                    borderRadius: "0",
                  }}
                  placeholder="Enter IFSC code"
                />
              </div>
            </>
          )}

          {/* UPI Fields */}
          {tab === "upi" && (
            <div className="mb-6">
              <label
                className="block text-sm font-semibold mb-1 uppercase"
                style={{ color: "#e63820" }}
              >
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
                style={{
                  backgroundColor: "#ffe3b3",
                  border: "2px solid #f46d04",
                  color: "#a20604",
                  borderRadius: "0",
                }}
                placeholder="Enter your UPI ID"
              />
            </div>
          )}

          {/* Submit */}
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
            Submit Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
