import React from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-124px)] bg-[var(--color-primary)] relative px-7 py-6">
      {/* Adjust min-h to subtract header/footer height */}

      {/* Change Password Card */}
      <div className="bg-[var(--bg-secondary)] w-full max-w-70 rounded-lg shadow-lg overflow-hidden py-8 px-5">
        <h2 className="text-center text-lg font-bold text-[var(--color-primary)] mb-6">
          Change Password
        </h2>

        {/* Current Password */}
        <div className="mb-4 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="password"
            placeholder="Current Password"
            className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          />
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="password"
            placeholder="New Password"
            className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-6 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-[var(--color-primary)] text-white rounded-full py-2 text-sm font-semibold hover:bg-[#002C77] transition-colors">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Settings;
