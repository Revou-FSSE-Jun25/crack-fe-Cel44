"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyBookings } from "@/src/app/lib/api";

export default function HistoryPage() {
    
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

    // ambil token
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
    
        if (!storedToken) {
            router.push("/login"); 
        return;
        }
    
        setToken(storedToken);
    }, [router]);


    // fetch history
    useEffect(() => {
        if (!token) return;

        async function fetchHistory() {
            try {
                const data = await getMyBookings(token!);
                setBookings(data);

            } catch (err) {
                console.error(err);

            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, [token]);

    if (loading) return <p>Loading history...</p>;

    if (bookings.length === 0) {
        return <p className="text-center mt-10">No booking history yet</p>;
    }

    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">My Booking History</h1>

        <div className="space-y-4">
            {bookings.map((booking) => (
            <div
                key={booking.id}
                className="flex gap-4 p-4 border rounded shadow-sm"
            >
                <img
                src={booking.showtime.movie.img}
                alt={booking.showtime.movie.title}
                className="w-24 h-36 object-cover rounded"
                />

                <div>
                <p className="font-bold text-xl mb-2">{booking.showtime.movie.title}</p>
                <p><span className="font-semibold">Date,Time:</span> {new Date(booking.showtime.time).toLocaleString()}</p>
                <p> <span className="font-semibold">Seats: </span> {booking.seats.map((s: any) => s.seatNumber).join(", ")}</p>
                <p className="font-semibold mt-1">
                <span className="font-semibold">Total: </span> {booking.totalPrice}
                </p>
                </div>
            </div>
            ))}
        </div>
        </main>
    );
}
