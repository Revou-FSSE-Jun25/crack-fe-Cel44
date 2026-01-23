"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    movieId: number;
    movieTitle: string;
    showtimes: { id: number; time: string; price: number }[];
}

export default function ChooseSeatButton({ movieId, showtimes, movieTitle }: Props) {
    const router = useRouter();
    const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(null);

    function handleBuyTicket() {
        if (!selectedShowtimeId) return;
    
        const confirmPurchase = window.confirm(
          `Do you want to buy a ticket for "${movieTitle}"?`
        );
        if (!confirmPurchase) return;
    
        router.push(`/movies/${movieId}/seatselection?time=${selectedShowtimeId}`);
    }

    return (
        <div className="mt-6">
        <h2 className="font-semibold mb-2">Select Showtime</h2>

        <div className="flex gap-3 mb-4">
            {showtimes.map((st) => (
             <button
             key={st.id}
             onClick={() => setSelectedShowtimeId(st.id.toString())}
             className={`px-4 py-2 rounded border ${
               selectedShowtimeId === st.id.toString() ? "border-red-500 text-red-500" : "border-gray-300"
             }`} 
           >
             {new Date(st.time).toLocaleString()} - Rp.{st.price}
           </button>
            ))}
        </div>


        <button
            onClick={handleBuyTicket}
            disabled={!setSelectedShowtimeId}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
            Choose Seat
        </button>
        </div>
    )
}