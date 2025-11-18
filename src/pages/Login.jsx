import { Lock, User, Shield } from "lucide-react";
import React, { useState, useEffect } from "react";
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

  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate simple captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCaptcha(random);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (inputCaptcha !== captcha) {
      setError("Captcha does not match");
      generateCaptcha(); // regenerate captcha on failure
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        userId: userId.toUpperCase(),
        password,
      };

      const response = await api.post("/login/gamma/authenticate", payload);

      if (response && response.accessToken) {
        const userInfo = {
          userId: response.userId,
          displayName: response.displayName,
          balance: response.balance || 0,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("authToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken || "");

        if (remember) {
          localStorage.setItem("rememberUserId", userId.toUpperCase());
          localStorage.setItem("rememberPassword", password);
        } else {
          localStorage.removeItem("rememberUserId");
          localStorage.removeItem("rememberPassword");
        }

        window.dispatchEvent(new Event("storage"));
        navigate("/");
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
              onChange={(e) => setUserId(e.target.value.toUpperCase())}
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

          {/* Captcha Section */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Shield className="text-gray-500 w-4 h-4" />
                <span className="text-xs font-semibold text-gray-600">
                  Enter Captcha:
                </span>
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-[10px] text-[var(--color-primary)] font-bold hover:underline mr-2"
              >
                Refresh
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 text-gray-800 text-sm font-bold px-3 py-1.5 rounded-md select-none">
                {captcha}
              </div>
              <input
                type="text"
                value={inputCaptcha}
                onChange={(e) =>
                  setInputCaptcha(e.target.value.toUpperCase())
                }
                placeholder="Enter Captcha"
                className="bg-white w-full flex-1 rounded-full border-2 border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Remember Me with Tick */}
          <label className="flex items-center mt-3 cursor-pointer select-none mb-2">
            <input
              type="checkbox"
              id="remember"
              className="hidden peer"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="w-4 h-4 border border-[var(--color-primary)] rounded-sm flex items-center justify-center peer-checked:bg-[var(--color-primary)] transition relative">
              {remember && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
            <div className="flex items-center mt-0.5 ml-2 text-[var(--color-primary)] text-[9px] font-bold ">
              Remember Me
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] text-white rounded-full py-1.5 text-sm font-semibold hover:bg-[#002C77] transition-colors"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
