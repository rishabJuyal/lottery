import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleAddMoney = () => navigate("/add-money");
  const handleWithdraw = () => navigate("/withdraw");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/gamma/users/me");
        const data = response.data || response;

        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load user:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#e5e5e5] shadow-[0_4px_15px_rgba(0,0,0,0.08)] p-5">

        {/* Top Bar */}
        <div
          className="h-[3px] mb-5"
          style={{
            background: "linear-gradient(to right, #f9a664, #f46d04, #a20604)",
          }}
        />

        {/* Header */}
        <div className="text-center">
          <div
            className="w-20 h-20 mx-auto flex items-center justify-center text-3xl font-semibold text-white"
            style={{
              background: "linear-gradient(145deg, #f46d04, #a20604)",
            }}
          >
            {fullName[0]?.toUpperCase()}
          </div>

          <h1 className="mt-3 text-lg font-semibold text-gray-800 tracking-wide">
            {fullName}
          </h1>
          <p className="text-xs text-gray-500 tracking-wide mt-1">
            User ID: {user.userId}
          </p>
        </div>
        {/* Balance Card */}
        <div
          className="my-4 mx-auto w-full max-w-xs rounded-lg p-6 text-center shadow-[0_8px_15px_rgba(249,166,100,0.4)]"
          style={{
            background: "linear-gradient(to bottom, #ffed33, #f9a664)",
            border: "1px solid #f9a664",
          }}
        >
          <p
            className="text-sm text-gray-700 mb-1"
            style={{ fontWeight: 500 }}
          >
            My Balance
          </p>

          <p
            className="text-4xl font-extrabold text-[#4b2b00]"
            style={{ fontFamily: 'sans-serif' }}
          >
            ₹{user.balance.toFixed(2)}
          </p>
        </div>


        {/* Buttons
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleAddMoney}
            className="flex-1 py-2 text-sm font-semibold text-[#4b2b00] border border-[#f9a664] 
              bg-gradient-to-b from-[#ffed33] to-[#f9a664] hover:brightness-95 active:scale-[0.98] transition-all"
          >
            Add Money
          </button>

          <button
            onClick={handleWithdraw}
            className="flex-1 py-2 text-sm font-semibold text-white border border-[#a20604] 
              bg-gradient-to-b from-[#f46d04] to-[#a20604] hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Withdraw
          </button>
        </div> */}

        {/* Divider */}
        <div className="border-t border-gray-200 mb-4"></div>

        {/* User Info */}
        <h2 className="text-sm font-semibold text-[#a20604] mb-3 uppercase tracking-wide text-center">
          User Details
        </h2>

        <div className="space-y-2 text-[13px] text-gray-700">
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">User ID</span>
            <span className="font-medium">{user.userId}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{fullName}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Balance</span>
            <span className="font-medium">₹{user.balance}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Parent Agent ID</span>
            <span className="font-medium">{user.parentAgentId}</span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Total Tickets</span>
            <span className="font-medium">{user.totalTickets}</span>
          </div>
          {/* Buttons */}
          <div className="flex mb-6">
            <button
              onClick={() => navigate("/settings")}
              className="flex-1 py-2 text-sm font-semibold text-[#4b2b00] border border-[#f9a664] 
      bg-gradient-to-b from-[#ffed33] to-[#f9a664] hover:brightness-95 active:scale-[0.98] transition-all"
            >
              Change Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
