import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = {
    id: "123456",
    name: "John Doe",
    phone: "+1 234 567 890",
    balance: 1250.0,
  };
  const navigate = useNavigate();
  const handleAddMoney = () => navigate('/add-money');
  const handleWithdraw = () => navigate('/withdraw');

  return (
    <div
      className="min-h-[calc(100vh-124px)] flex items-center justify-center p-4"
    //   style={{
    //     background: "linear-gradient(to bottom, #ffed33 0%, #f9a664 20%, #f46d04 80%, #a20604 100%)",
    //   }}
    >
      {/* Card */}
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
            {user.name[0].toUpperCase()}
          </div>

          <h1 className="mt-3 text-lg font-semibold text-gray-800 tracking-wide">
            {user.name}
          </h1>
          <p className="text-xs text-gray-500 tracking-wide mt-1">{user.phone}</p>
        </div>

        {/* Balance */}
        <div className="text-center mt-6 mb-6">
          <p className="text-xs text-gray-500 uppercase">Wallet Balance</p>
          <p className="text-2xl font-bold text-[#a20604] mt-1">₹{user.balance.toFixed(2)}</p>
        </div>

        {/* Buttons */}
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
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-4"></div>

        {/* User Info */}
        <h2 className="text-sm font-semibold text-[#a20604] mb-3 uppercase tracking-wide text-center">
          User Details
        </h2>

        <div className="space-y-2 text-[13px] text-gray-700">
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">User ID</span>
            <span className="font-medium">{user.id}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">{user.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
