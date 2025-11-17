import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Settings = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Inline feedback
  const [messageType, setMessageType] = useState("error"); // "error" or "success"

  const handleSubmit = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo?.userId;

    if (!userId) {
      setMessage("User not found. Please login again.");
      setMessageType("error");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = { userId, oldPassword: currentPassword, newPassword };
      const response = await api.post("/login/gamma/changePassword", payload);

      // Since Axios interceptor returns response.data, use response directly
      if (response) {
        const updatedUser = response;

        // Update localStorage with new user info and tokens
        const updatedUserInfo = {
          userId: updatedUser.userId || userInfo.userId,
          displayName: updatedUser.displayName || userInfo.displayName,
          balance: updatedUser.balance ?? userInfo.balance,
          accessToken: updatedUser.accessToken || userInfo.accessToken,
          refreshToken: updatedUser.refreshToken || userInfo.refreshToken,
        };

        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        localStorage.setItem("authToken", updatedUserInfo.accessToken);
        localStorage.setItem("refreshToken", updatedUserInfo.refreshToken || "");

        // Notify other components if needed
        window.dispatchEvent(new Event("storage"));

        setMessage("Password changed successfully!");
        setMessageType("success");

        // Redirect after short delay
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(response?.message || "Failed to change password.");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setMessage("Current password is incorrect.");
      } else {
        setMessage("Error changing password. Please try again.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-[var(--color-primary)] px-7 py-6">
      <div className="bg-[var(--bg-secondary)] w-full max-w-70 rounded-lg shadow-lg py-8 px-5">
        <h2 className="text-center text-lg font-bold text-[var(--color-primary)] mb-6">
          Change Password
        </h2>

        {/* Feedback Message */}
        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              messageType === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* Current Password */}
        <div className="mb-4 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          />
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[var(--color-primary)] text-white rounded-full py-2 text-sm font-semibold hover:bg-[#002C77] transition-colors"
        >
          {loading ? "Submitting..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
