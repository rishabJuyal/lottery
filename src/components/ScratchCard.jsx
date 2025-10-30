import React from "react";

const ScratchTicketCard = ({ imageUrl, price, id, startDate }) => {
    return (
        <div className="bg-amber-200 rounded-xl shadow-md min-w-40 overflow-hidden">
            <div className="relative">
                <img
                    src={imageUrl}
                    //alt={`Ticket ${id}`}
                    className="w-full h-24 object-cover rounded"
                />
                <div
                    className="absolute top-0 left-15 font-bold text-gray-100"
                    style={{
                        WebkitTextStroke: "1px black", // black border
                        color: "white",                // text fill color
                    }}
                >
                    {id}
                </div>

            </div>
            <div className="flex flex-row p-1 px-2 justify-between bg-gray-600 text-xs text-gray-100 font-bold">
                <div className="">
                    Start {startDate}
                </div>
                <div>
                    {price}
                </div>
            </div>
        </div>
    );
};

export default ScratchTicketCard;
