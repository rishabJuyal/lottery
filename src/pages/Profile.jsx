import React from "react";

const Profile = () => {
  // Example user data
  const user = {
    id: "123456",
    name: "John Doe",
    phone: "+1 234 567 890",
    balance: 1250.0,
  };

  // Example handlers
  const handleAddMoney = () => {
    alert("Add Money clicked!");
  };

  const handleWithdraw = () => {
    alert("Withdraw clicked!");
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl border border-gray-200 p-6">
        {/* Avatar + Balance */}
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white shadow-md">
            {user.name[0].toUpperCase()}
            <div className="absolute -bottom-1 -right-1 bg-green-600 text-white text-[10px] px-2 py-[1px] rounded-full shadow-sm">
              Online
            </div>
          </div>

          {/* Balance */}
          <div className="mt-5 text-center">
            <p className="text-gray-500 text-sm font-medium">Wallet Balance</p>
            <p className="text-3xl font-bold text-green-700 mt-1">
              ₹{user.balance.toFixed(2)}
            </p>
          </div>

          {/* Add / Withdraw Buttons */}
          <div className="mt-5 flex gap-4">
            <button
              onClick={handleAddMoney}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md transition-transform hover:scale-105"
            >
              Add Money
            </button>
            <button
              onClick={handleWithdraw}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md transition-transform hover:scale-105"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* User Details */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
            User Information
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">User ID:</span>
              <span className="font-medium text-gray-900">{user.id}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Phone:</span>
              <span className="font-medium text-gray-900">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
