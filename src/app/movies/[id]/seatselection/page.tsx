"use client";

import { useState } from "react";
import BuyTicketButton from "../../../component/buyticketbutton";

export default function SeatSelectionPage() {
    const rows = 8;
    const seatsPerRow = 8;
    const aisleRow = 4;

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    function toggleSeat(seatNumber: number) {
        setSelectedSeats((prev) =>
        prev.includes(seatNumber)
            ? prev.filter((s) => s !== seatNumber)
            : [...prev, seatNumber]
        );
    }

    return (
        <main className="py-20 px-20 flex flex-col items-center min-h-screen">

            {/* Garis penanda layar bioskop */}
            <div className="w-full h-8 bg-gray-800 mb-12 flex items-center justify-center text-white">
                Screen
            </div>

            {/* Seats */}
            <div className="grid grid-cols-9 gap-2">
                {Array.from({ length: rows }).map((_, rowIndex) =>
                    Array.from({ length: seatsPerRow + 1 }).map((_, colIndex) => {
                        
                    // Pembagian kursi
                    if (colIndex === aisleRow) {
                        return <div key={`aisle-${rowIndex}-${colIndex}`} />;
                    }

                    const seatNumber = (colIndex < aisleRow ? colIndex + 1 : colIndex) + rowIndex * seatsPerRow;
                    const isSelected = selectedSeats.includes(seatNumber);

                    return (
                    <div
                    key={seatNumber}
                    onClick={() => toggleSeat(seatNumber)}
                    className={`w-10 h-10 rounded flex items-center justify-center cursor-pointer
                    ${isSelected ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                        {seatNumber}
                    </div>
                    );
                })
                )}
            </div>

            <BuyTicketButton selectedSeats={selectedSeats} />
        </main>

    );
}
