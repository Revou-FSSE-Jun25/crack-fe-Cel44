"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllShowtimes, createShowtime, deleteShowtime,  } from "../../../lib/api";

export default function ManageShowtimePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const param = useParams();
    const movieId = Number(param.id);
    const token = localStorage.getItem("token");
    const [showtimes, setShowtimes] = useState<any[]>([]);
    const [time, setTime] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (!token) router.push("/login");

        async function fetchShowtimes() {
        const all = await getAllShowtimes(token!);
        setShowtimes(all.filter((st: any) => st.movieId === movieId));
        }

        fetchShowtimes();
    }, [movieId, router, token]);

    async function handleCreate(e: any) {
        e.preventDefault();
        if (!time || !price) return;

        await createShowtime({ movieId, time, price: Number(price) }, token!);
        setTime("");
        setPrice("");

        const all = await getAllShowtimes(token!);
        setShowtimes(all.filter((st: any) => st.movieId === movieId));
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-center">Manage Showtime</h1>

        <form onSubmit={handleCreate} className="flex flex-col gap-4 mb-6">
            <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border px-3 py-2 rounded-md"
            />

            <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-3 py-2 rounded-md"
            />

            <button type="submit" className="bg-green-500 text-white py-2 rounded-md">
            Add Showtime
            </button>

        </form>

        <div>
            <h2 className="font-bold mb-2">Existing Showtimes</h2>
            {showtimes.map((st) => (
            <div key={st.id} className="flex justify-between mb-1 p-2 border rounded">
                <span>{new Date(st.time).toLocaleString()} - Rp. {st.price}</span>
            </div>
            ))}
        </div>
        </div>
    );
}
