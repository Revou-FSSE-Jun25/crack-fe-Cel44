"use client";

import { useState, useEffect } from "react";
import ChooseSeatButton from "../../component/chooseseatbutton";
import { getMovieById } from "../../lib/api";
import { useParams } from "next/navigation";

export default function MovieDetailPage() {
    const param = useParams();
    const movieId = param.id;

    const [movieDetail, setMovieDetail] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
        if (!movieId || !token) return;

        async function fetchMovie() {
        try {
            const data = await getMovieById(movieId, token);
            setMovieDetail(data);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to fetch movie");

        } finally {
            setLoading(false);
        }
        
        }

        fetchMovie();
    }, [movieId, token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!movieDetail) return <p>Movie not found</p>;

    const genre = Array.isArray(movieDetail.genre) ? movieDetail.genre.join(", ") : movieDetail.genre || "N/A";
    const showtimes = Array.isArray(movieDetail.showtimes) ? movieDetail.showtimes : [];

    return (
        <main className="py-20 px-20 flex flex-col md:flex-row gap-10 justify-center">
        <div className="flex-shrink-0">
            <img
            src={movieDetail.img}
            alt={movieDetail.title}
            className="w-80 rounded-xl object-cover"
            />
        </div>

        <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{movieDetail.title}</h1>
            <p className="text-gray-700 mb-2">Genre: {genre}</p>
            <p className="text-gray-700 mb-2">Rating: {movieDetail.rating ?? "N/A"}</p>
            <p className="text-gray-700 mb-4">Duration: {movieDetail.duration} minutes</p>
            <p className="text-gray-700 mb-4">{movieDetail.description}</p>
            <p className="text-gray-700 mb-4">Price: Rp.{movieDetail.price}</p>

            {/* Showtimes */}
            {showtimes.length > 0 ? (
            <ChooseSeatButton
                movieId={movieDetail.id}
                movieTitle={movieDetail.title}
                showtimes={movieDetail.showtimes}
           />
            ) : (
            <p>No showtimes available</p>
            )}
        </div>
        </main>
    );
}
