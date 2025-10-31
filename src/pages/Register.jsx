import React, { useState } from "react";
import { User, Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");

  // Generate simple captcha
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCaptcha(random);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary-light)] relative px-7">
      {/* Close button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 right-3 text-white text-[50px] font-light leading-none hover:text-gray-300 transition"
      >
        ×
      </button>

      {/* Register Box */}
      <div className="bg-[var(--bg-secondary)] w-full max-w-70 rounded-lg shadow-lg overflow-hidden">
        <div className="mt-10 px-3 pb-6">
          {/* Email / Phone Field */}
          <div className="mb-3 relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Email Address or Phone Number"
              className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className="mb-3 relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Enter Password"
              className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3 relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
          </div>

          {/* Captcha */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Shield className="text-gray-500 w-4 h-4" />
                <span className="text-xs font-semibold text-gray-600">
                  Enter Captcha:
                </span>
              </div>
              <button
                onClick={generateCaptcha}
                className="text-[10px] text-[var(--color-primary)] font-bold hover:underline"
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
                onChange={(e) => setInputCaptcha(e.target.value.toUpperCase())}
                placeholder="Enter Captcha"
                className="bg-white w-full flex-1 rounded-full border-2 border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Register Button */}
          <button className="w-full bg-[var(--color-primary)] text-white rounded-full py-1.5 text-sm font-semibold hover:bg-[#002C77] transition-colors">
            REGISTER
          </button>
        </div>

        {/* Divider Section */}
        <div className="bg-[var(--color-primary)] text-white text-center py-4 pb-6 px-3 border-1 border-t-0 border-blue-300 rounded-b-lg">
          <p className="text-[13px] font-semibold mb-2">
            Already Registered?
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white w-full text-[#002C77] px-10 py-1.5 rounded-full font-bold text-sm hover:bg-gray-100 transition"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
