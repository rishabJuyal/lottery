// src/pages/JackpotPage.jsx
import React from "react";
import JackpotCard from "../components/JackpotCard";
import lotteryLogo from '../assets/lottery-logo.png';

const dummyJackpots = [
    {
        jackpot: "$50 Million",
        nextDrawDate: "11/05/2025",
        resultsDate: "11/03/2025",
        numbers: [5, 12, 19, 28, 33, 42],
        imageUrl: lotteryLogo,
        isJackpotAlert: true,
        powerPlay: 2,
    },
    {
        jackpot: "$25 Million",
        nextDrawDate: "11/06/2025",
        resultsDate: "11/04/2025",
        numbers: [3, 7, 14, 21, 29, 35],
        imageUrl: lotteryLogo,
        isJackpotAlert: false,
        powerPlay: 3,
    },
    {
        jackpot: "$10 Million",
        nextDrawDate: "11/07/2025",
        resultsDate: "11/05/2025",
        numbers: [1, 8, 15, 22, 30, 40],
        imageUrl: lotteryLogo,
        isJackpotAlert: false,
        powerPlay: null,
    },
    {
        jackpot: "$5 Million",
        nextDrawDate: "11/08/2025",
        resultsDate: "11/06/2025",
        numbers: [2, 9, 16, 23, 31, 41],
        imageUrl: lotteryLogo,
        isJackpotAlert: true,
        powerPlay: 5,
    },
];

const DrawGames = () => {
    return (
        <div className="bg-white min-h-screen p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dummyJackpots.map((jackpot, idx) => (
                    <JackpotCard key={idx} {...jackpot} />
                ))}
            </div>
        </div>
    );
};

export default DrawGames;
