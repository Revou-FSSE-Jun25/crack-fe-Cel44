"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createBooking } from "../../../lib/api"; // API function untuk booking
import { getShowtimeSeats } from "../../../lib/api"; // API function fetch seats

type SeatType = {
    id: number;
    seatNumber: string;
    isBooked: boolean;
};

type ShowtimeType = {
    id: number;
    time: string;
    price: number;
    movieId: number;
};

export default function SeatSelectionPage() {
    const params = useSearchParams();
    const router = useRouter();
    const showtimeId = Number(params.get("time"));

    const [seats, setSeats] = useState<SeatType[]>([]);
    const [showtime, setShowtime] = useState<ShowtimeType | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
      }, []);

    
    useEffect(() => {
        if (!showtimeId || !token) return;

        async function fetchSeats() {
            try {
                const data = await getShowtimeSeats(showtimeId, token);
                setSeats(data.seats);
                setShowtime({ id: data.id, time: data.time, price: data.price, movieId: data.movieId });
                
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Failed to fetch seats");

            } finally {
                setLoading(false);
            }
            }

        fetchSeats();
    }, [showtimeId, token]);
    

    function toggleSeat(seatId: number) {
        const seat = seats.find(s => s.id === seatId);
        if (!seat || seat.isBooked) return;

        if (selectedSeats.includes(seatId)) {
        setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
        setSelectedSeats([...selectedSeats, seatId]);
        }
    }

    async function handleConfirmBooking() {
        if (!showtime) return;
    
        router.push(
        `/payment?moveiId=${showtime.movieId}&showtimeId=${showtimeId}&seats=${selectedSeats.join(",")}`
        );
    }
      

    if (loading) return <p>Loading seats...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!showtime) return <p>Showtime not found</p>;

    return (
        <main className="py-20 px-10">
        <h1 className="text-2xl font-bold mb-4">Select Seats</h1>
        <p className="mb-4">
            Showtime: {new Date(showtime.time).toLocaleString()} | Price per seat: Rp.{showtime.price}
        </p>

        <div className="grid grid-cols-8 gap-2 mb-4">
            {seats.map(seat => (
            <div
                key={seat.id}
                onClick={() => toggleSeat(seat.id)}
                className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer 
                ${seat.isBooked ? "bg-gray-400 cursor-not-allowed" :
                    selectedSeats.includes(seat.id) ? "bg-green-500 text-white" : "bg-white border"}`}
            >
                {seat.seatNumber}
            </div>
            ))}
        </div>

        <button
            onClick={handleConfirmBooking}
            disabled={selectedSeats.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
            Book
        </button>
        </main>
    );
}
