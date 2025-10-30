import { Lock, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 for navigation

const LoginPage = () => {
  const navigate = useNavigate(); // hook for programmatic navigation

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary-light)] relative px-7">
      {/* Close button (absolutely positioned at top-right) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 right-3 text-white text-[50px] font-light leading-none hover:text-gray-300 transition"
      >
        ×
      </button>

      {/* Login Box */}
      <div className="bg-[var(--bg-secondary)] w-full max-w-70 rounded-lg shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="mt-10 px-3 pb-6">
          {/* Email Field */}
          <div className="mb-3 relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className="relative mb-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="bg-white w-full rounded-full border-2 border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-left mb-2">
            <button className="ml-2 text-[9px] font-bold text-[var(--color-primary)] hover:underline">
              Forgot Your Password?
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full bg-[var(--color-primary)] text-white rounded-full py-1.5 text-sm font-semibold hover:bg-[#002C77] transition-colors">
            LOGIN
          </button>

          {/* Remember Me */}
          <label className="flex items-center mt-3 cursor-pointer">
            <input type="checkbox" id="remember" className="hidden peer" />
            <span className="w-5 h-5 border border-[var(--color-primary)] rounded-sm flex items-center justify-center peer-checked:bg-blue-700 transition"></span>
            <span className="ml-2 text-[var(--color-primary)] text-[9px] font-bold">
              Remember My Login
            </span>
          </label>
        </div>

        {/* Divider Section */}
        <div className="bg-[var(--color-primary)] text-white text-center py-4 pb-6 px-3 border-1 border-t-0 border-blue-300 rounded-b-lg">
          <p className="text-[13px] font-semibold mb-2">
            Haven’t Registered Yet?
          </p>
          <button className="bg-white w-full text-[#002C77] px-10 py-1.5 rounded-full font-bold text-sm hover:bg-gray-100 transition">
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
