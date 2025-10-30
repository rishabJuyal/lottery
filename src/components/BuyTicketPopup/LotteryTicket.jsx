// 📁 components/LotteryTicket.jsx
import React from "react";
import mrp from "../../assets/mrp.png";
import m from "../../assets/m.png";
import logo from "../../assets/lottery-logo.png"

const LotteryTicket = ({
  onClose,
  onPurchase,
  loading,
  canPurchase,
}) => {
  return (
    <div
      className="relative min-h-54 flex flex-row flex-nowrap justify-between w-[320px] shadow-lg border-y-[18px] border-[#307432] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left strip */}
      <div className="bg-[#a43333] w-[8%]"></div>

      {/* Content area */}
      <div className="relative bg-gradient-to-b from-green-100 to-purple-100 w-full">
        <div
          className="absolute left-4 top-4 w-[85%] h-[85%] m-auto rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle at top left, white 0%, pink 100%)",
          }}
        ></div>

        {/* Top Left Ticket Section */}
        <div className="absolute top-0 left-1 flex flex-col text-left">
          <div className="w-28">
            <img 
            src = {logo}
            className="w-[36px] mt-2 mx-auto"></img>
          </div>

          {/* Header */}
          <div className="flex items-center space-x-2">
            <div className="text-[8px] font-bold text-black">
              NAGALAND STATE LOTTERIES
            </div>
          </div>

          {/* Ticket Info */}
          <div className="flex flex-col font-sans items-center text-center leading-tight w-29">
            <div className="text-[18px] font-extrabold text-red-400 bg-yellow-300/80 px-[1px] leading-none w-fit">
              DEAR
            </div>
            <div className="text-[18px] font-extrabold text-red-800 leading-none w-fit -mt-[1px]">
              MAHANADI
            </div>
          </div>

          {/* Subheading */}
          <div className="text-[8px] font-bold text-purple-900 leading-none m-0">
            MORNING THURSDAY WEEKLY LOTTERY
          </div>

          {/* Prize Section */}
          <div className="flex flex-col text-left leading-none">
            <div className="text-[9px] font-bold text-black tracking-tight">
              First Prize ₹
            </div>
            <div className="flex items-baseline leading-7">
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-[34px] font-extrabold text-green-700 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.2)]"
              >
                1,00,000
              </span>
              <span className="text-[20px] font-bold text-gray-800 ml-[2px]">
                x20
              </span>
            </div>
            <div className="text-[10px] font-bold text-gray-800">
              129th Draw On 18-09-2025
            </div>
          </div>
        </div>

        {/* Ticket Number (Top Right) */}
        <div className="absolute top-0 right-0">
          <div className="relative w-[170px] h-[45px] flex items-center justify-center 
              bg-gradient-to-r from-green-50 via-blue-50 to-green-50 
              border border-gray-300 shadow-inner">
            <div className="absolute inset-0 text-[8px] text-green-800 opacity-20 
                flex items-center justify-center tracking-[2px]">
              ABCD EFGH IJKL MNOP QRST ABCD EFGH IJKL MNOP QRST ABCD EFGH IJKL MNOP QRST
            </div>
            <div className="relative z-10 text-[24px] font-extrabold tracking-wider text-gray-900">
              <span className="font-sans text-gray-900">70A</span>{" "}
              <span className="font-mono text-gray-900">12188</span>
            </div>
          </div>
        </div>

        {/* Bottom Right Section */}
        <div className="absolute bottom-0 right-1 flex flex-col items-end">
          <div className=" relative flex flex-col items-end w-30 leading-4 mr-5">
            <div className="text-[12px] font-bold text-gray-700">
              129th Draw On{" "}
            </div>
            <div className="text-[14px] font-bold text-gray-800">
              18-09-2025
            </div>
          </div>

          <div className=" relative flex flex-col items-end w-full -mb-3">
            <div className="text-[10px] font-bold text-gray-700 leading-tight">
              05:00 PM ONWARDS
            </div>
            <div className="text-[11px] font-bold text-purple-800 leading-tight">
              THURSDAY
            </div>
          </div>

          {/* MRP */}
          <div className="flex flex-col items-start w-28">
            <div
              className="w-[55px] h-[40px] flex items-center justify-center text-[9px] font-bold text-yellow-200 drop-shadow-sm"
              style={{
                backgroundImage: `url(${m})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              M-15
            </div>

            <div
              className="w-[50px] h-[50px] pt-1.5 flex items-center justify-center text-[10px] font-bold text-yellow-200 drop-shadow-sm"
              style={{
                backgroundImage: `url(${mrp})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              500/
            </div>
          </div>

          {/* Buy & Cancel Buttons */}
          <div className="absolute bottom-1 right-2 w-12">
            <div className="flex flex-col text-[10px] font-bold gap-2 mt-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "..." : "CANCEL"}
              </button>

              <button
                onClick={onPurchase}
                disabled={loading || !canPurchase}
                className={`${
                  !canPurchase
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white py-2 rounded disabled:opacity-50`}
              >
                {loading
                  ? "PROCESSING..."
                  : !canPurchase
                  ? "CLOSED"
                  : "BUY"}
              </button>
            </div>
          </div>
        </div>

        <p className="absolute -translate-y-10 translate-x-6 bottom-0 right-0 -rotate-90 font-bold text-[6px] text-gray-900">
          DETAILS OVERLEAF
        </p>

        {/* Bottom Ticket Number */}
        <div className="absolute bottom-0 left-0">
          <div className="relative w-[170px] h-[35px] flex items-center justify-center 
              bg-gradient-to-r from-green-50 via-blue-50 to-green-50 
              border border-gray-300 shadow-inner">
            <div className="absolute inset-0 text-[8px] text-green-800 opacity-20 font-bold 
                flex items-center justify-center tracking-[2px]">
                ABCD EFGH IJKL MNOP QRST ABCD EFGH IJKL MNOP QRST ABCD EFGH IJKL MNOP QRST
            </div>
            <div className="relative z-10 text-[22px] font-extrabold tracking-wider text-gray-900">
              <span className="font-sans text-gray-900">70A</span>{" "}
              <span className="font-mono text-gray-900">12188</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right strip */}
      <div className="bg-[#a43333] w-[2%]"></div>
    </div>
  );
};

export default LotteryTicket;
