import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LotteryTicket from "./LotteryTicket";

const BuyTicketPage = ({ onPurchase, loading }) => {
  const [canPurchase, setCanPurchase] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const nextDraw = new Date(now);
      nextDraw.setHours(17, 0, 0, 0);
      if (now > nextDraw) nextDraw.setDate(nextDraw.getDate() + 1);
      const diff = nextDraw.getTime() - now.getTime();
      setCanPurchase(diff > 30 * 60 * 1000);
    };
    check();
    const timer = setInterval(check, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

      {/* 🧾 Ticket List */}
      <div className="flex flex-col items-center gap-4 p-4 w-full max-w-[420px]">
        <LotteryTicket
          onPurchase={onPurchase}
          loading={loading}
          canPurchase={canPurchase}
        />
        <LotteryTicket
          onPurchase={onPurchase}
          loading={loading}
          canPurchase={canPurchase}
        />
        <LotteryTicket
          onPurchase={onPurchase}
          loading={loading}
          canPurchase={canPurchase}
        />
      </div>
    </div>
  );
};

export default BuyTicketPage;
