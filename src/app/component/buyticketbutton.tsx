"use client"

import { useParams, useRouter } from "next/navigation";

type BuyTicketButtonProps = {
    selectedSeats: number[];
};

export default function BuyTicketButton({ selectedSeats }: BuyTicketButtonProps) {

    const router = useRouter();
    const params = useParams();
    const movieId = Number(params.id);

    function handleClick() {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat to proceed with the purchase.");
            return;
        } else {
            router.push(`/payment?movieId=${movieId}&seats=${selectedSeats.join(",")}`);
        }
    }

    return (
        <button
            onClick={handleClick}
            className="mt-10 px-8 py-3 rounded bg-green-600 text-white
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            Buy Ticket
        </button>
    );
}