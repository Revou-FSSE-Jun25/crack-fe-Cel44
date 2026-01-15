"use client"

import { useRouter } from "next/navigation";
import movies from "../../../data/movies.json";

export default function ChooseSeatButton({ movieId }: { movieId: number }) {
    const router = useRouter();

    function handleBuyTicket() {
        const movieDetail = movies.find((movie) => movie.id === movieId);
        if (!movieDetail) {
            alert("Movie not found");
            return;
        }

        const confirmPurchase = window.confirm(`Do you want to buy a ticket for "${movieDetail.title}"?`);
        if (!confirmPurchase) return

        if (confirmPurchase) {
            router.push(`/movies/${movieId}/seatselection`);
        }
        
    }

    return (
        <button 
            onClick={handleBuyTicket}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
            Choose Seat
        </button>
    )
}