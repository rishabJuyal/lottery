import React from "react";
import JackpotCard from "../components/JackpotCard";
import ScratchTicketCard from "../components/ScratchCard";
import lotteryLogo from '../assets/lottery-logo.png'

import ScratchCard1 from '../assets/scratch-card-1.png';
import ScratchCard2 from '../assets/scratch-card-2.png';
import ScratchCard3 from '../assets/scratch-card-3.png';

import poster from '../assets/poster.png'
import { useNavigate } from "react-router-dom";


const drawGamesData = [
    {
        jackpot: "$70.5 Million",
        nextDrawDate: "10/29/2025",
        resultsDate: "10/27/2025",
        numbers: [4, 10, 12, 15, 28, 54],
        imageUrl: lotteryLogo,
        isJackpotAlert: false,
        powerPlay : 5,
    },
    {
        jackpot: "$15 Million",
        nextDrawDate: "10/30/2025",
        resultsDate: "10/28/2025",
        numbers: [3, 7, 19, 23, 33, 41],
        imageUrl: lotteryLogo,
        isJackpotAlert: true,
        powerPlay: null,
    },
    // Add more jackpot objects here
];

const scratchTicketsData = [
    {
        id: "#2671",
        price: "$20",
        imageUrl: ScratchCard1,
        startDate: "10/20/25",
    },
    {
        id: "#2693",
        price: "$5",
        imageUrl: ScratchCard2,
        startDate: "10/20/25",
    },
    {
        id: "#2689",
        price: "$2",
        imageUrl: ScratchCard3,
        startDate: "10/20/25",
    },
];

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white min-h-screen">
            <img
                src={poster}
                className="bg-blue-300 flex w-full h-auto mb-4">
            </img>
            <div className="p-3 space-y-2">
                {/* DRAW GAMES Section */}
                <section>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold text-[14px] flex items-center h-6 m-0">
                            DRAW GAMES
                        </h2>

                        <button
  onClick={() => navigate("/draw-games")}
  className="text-[12px] text-blue-600 font-semibold hover:underline"
>
  View All &gt;
</button>
                    </div>

                    <div className="flex space-x-3 overflow-x-auto p-4 pt-1 -ml-2">
                        {drawGamesData.map((jackpot, idx) => (
                            <JackpotCard key={idx} {...jackpot} />
                        ))}
                    </div>
                </section>

                {/* SCRATCH TICKETS Section */}
                <section>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold text-[14px] flex items-center h-6 m-0">
                            SCRATCH CARDS
                        </h2>

                        <button className="text-[12px] text-blue-600 font-semibold hover:underline">
                            View All &gt;
                        </button>
                    </div>

                    <div className="flex space-x-4 overflow-x-auto pb-4">
                        {scratchTicketsData.map((ticket, idx) => (
                            <ScratchTicketCard key={idx} {...ticket} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
