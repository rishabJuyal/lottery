import { Lock, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(
    localStorage.getItem("rememberUserId") || ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("rememberPassword") || ""
  );
  const [remember, setRemember] = useState(
    !!localStorage.getItem("rememberUserId")
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const payload = {
        userId: userId.toUpperCase(), // always uppercase
        password,
      };

      const response = await api.post("/login/gamma/authenticate", payload);
      
      // The token is now in accessToken
      if (response && response.accessToken) {
        const userInfo = {
          userId: response.userId,
          displayName: response.displayName,
          balance: response.balance || 0, // add balance if API provides
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
      
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      
        // existing token storage
        localStorage.setItem("authToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken || "");
      
        // Remember credentials
        if (remember) {
          localStorage.setItem("rememberUserId", userId.toUpperCase());
          localStorage.setItem("rememberPassword", password);
        } else {
          localStorage.removeItem("rememberUserId");
          localStorage.removeItem("rememberPassword");
        }
      
        // Trigger Header to update immediately
        window.dispatchEvent(new Event("storage"));
      
        navigate("/"); // redirect after login

      
      } else {
        console.log("Login response:", response);
        setError("Invalid login response");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary-light)] relative px-7">
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 right-3 text-white text-[50px] font-light leading-none hover:text-gray-300 transition"
      >
        ×
      </button>

      <div className="bg-[var(--bg-secondary)] w-full max-w-70 rounded-lg shadow-lg overflow-hidden">
        <form onSubmit={handleLogin} className="mt-10 px-3 pb-6">
          {error && (
            <div className="text-red-600 text-sm font-semibold mb-3 text-center">
              {error}
            </div>
          )}

          <div className="mb-3 relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          <div className="relative mb-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          <div className="text-left mb-2">
            <button
              type="button"
              className="ml-2 text-[9px] font-bold text-[var(--color-primary)] hover:underline"
            >
              Forgot Your Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] text-white rounded-full py-1.5 text-sm font-semibold hover:bg-[#002C77] transition-colors"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <label className="flex items-center mt-3 cursor-pointer">
            <input
              type="checkbox"
              id="remember"
              className="hidden peer"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="w-5 h-5 border border-[var(--color-primary)] rounded-sm flex items-center justify-center peer-checked:bg-blue-700 transition"></span>
            <span className="ml-2 text-[var(--color-primary)] text-[9px] font-bold">
              Remember My Login
            </span>
          </label>
        </form>

        <div className="bg-[var(--color-primary)] text-white text-center py-4 pb-6 px-3 border-1 border-t-0 border-blue-300 rounded-b-lg">
          <p className="text-[13px] font-semibold mb-2">
            Haven’t Registered Yet?
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white w-full text-[#002C77] px-10 py-1.5 rounded-full font-bold text-sm hover:bg-gray-100 transition"
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
