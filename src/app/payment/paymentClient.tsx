"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createBooking, getShowtimeById } from "@/src/app/lib/api";

export default function PaymentClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const showtimeId = Number(searchParams.get("showtimeId"));
    const seatIds = searchParams.get("seats")?.split(",").map(Number) ?? [];

    const [token, setToken] = useState<string | null>(null);
    const [showtime, setShowtime] = useState<any>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // mengambil token untuk digunakan nanti
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    // fetch movie yang dibeli
    useEffect(() => {
        if (!token || !showtimeId) return;

        async function fetchData() {
            try {
                const data = await getShowtimeById(showtimeId, token!);
                setShowtime(data);
            } catch (err: any) {
                setError(err.message || "Failed to load showtime");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [showtimeId, token]);


    if (loading) return <p>Loading total ticket...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!showtime) return <p>Showtime not found</p>;

    const totalPrice = seatIds.length * showtime.price;

    async function handleBooking() {
        if (!token) return;
    
        try {
            await createBooking(token, {
                showtimeId: showtime.id,
                seatIds,
            });
            console.log("TOKEN BEFORE REDIRECT:", localStorage.getItem("token"));
            router.push("/history");

        } catch (err: any) {
            alert(err.message || "Booking failed");
        }
    }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Payment</h1>

        {showtime.movie.img && (
            <img
                src={showtime.movie.img}
                alt={showtime.movie.title}
                className="w-1/2 h-auto object-cover rounded mb-4"
            />
        )}
        <p><b>Movie:</b> {showtime.movie.title}</p>
        <p><b>Showtime:</b> {new Date(showtime.time).toLocaleString()}</p>
        <p><b>Seats:</b> {seatIds.join(", ")}</p>
        <p className="mt-2 font-bold">Total: Rp {totalPrice}</p>

        <button
            onClick={handleBooking}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        >
            Confirm Payment
        </button>
    </div>
  );
}
