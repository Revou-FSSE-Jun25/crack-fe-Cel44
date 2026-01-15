"use client"

import { useRouter } from "next/navigation";
import movies from "../../../data/movies.json";
import { useState } from "react";

type Props = {
    movieId: number;
    showtimes: string[];
}

export default function ChooseSeatButton({ movieId, showtimes }: Props) {
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    function handleBuyTicket() {
        const movieDetail = movies.find((movie) => movie.id === movieId);
        if (!movieDetail) {
            alert("Movie not found");
            return;
        }

        const confirmPurchase = window.confirm(`Do you want to buy a ticket for "${movieDetail.title}"?`);
        if (!confirmPurchase) return

        if (confirmPurchase) {
            router.push(`/movies/${movieId}/seatselection?time=${selectedTime}`);
        }
        
    }

    return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">Select Showtime</h2>

            <div className="flex gap-3 mb-4">
                {showtimes.map((time) => (
                    <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded border
              ${
                  selectedTime === time
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
              }`}
                    >
                        {time}
                    </button>
                ))}
            </div>

            <button
                onClick={handleBuyTicket}
                disabled={!selectedTime}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
                Choose Seat
            </button>
        </div>
    )
}