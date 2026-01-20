"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMovieById, updateMovie } from "../../../lib/api";

export default function EditMoviePage() {
  const router = useRouter();
  const params = useParams(); // ambil id dari URL
  const movieId = params.id;

  // State form
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch movie data saat mount
  useEffect(() => {
    async function fetchMovie() {
        try {
            const token = localStorage.getItem("token");
            const data = await getMovieById(movieId, token);
            setTitle(data.title);
            setYear(data.year.toString());
            setDirector(data.director);
            setDuration(data.duration.toString());
            setGenre(data.genre.join(", "));
            setDescription(data.description);
            setImg(data.img);
        } catch (err) {
            alert("Failed to load movie");
        } finally {
            setLoading(false);
        }
        }
        fetchMovie();
  }, [movieId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
        await updateMovie(movieId, {
            title,
            year: Number(year),
            director,
            duration: Number(duration),
            genre: genre.split(",").map((g) => g.trim()),
            description,
            img,
        }, token);

        alert("Movie updated successfully!");
        router.push("/admin");
    } catch (err: any) {
        alert(err.message || "Failed to update movie");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Movie</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Movie Title" className="border px-3 py-2 rounded-md"/>

            <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" type="number" className="border px-3 py-2 rounded-md"/>

            <input value={director} onChange={(e) => setDirector(e.target.value)} placeholder="Director" className="border px-3 py-2 rounded-md"/>

            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (minutes)" type="number" className="border px-3 py-2 rounded-md"/>

            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" className="border px-3 py-2 rounded-md"/>

            <input value={img} onChange={(e) => setImg(e.target.value)} placeholder="Poster URL" className="border px-3 py-2 rounded-md"/>

            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Synopsis" className="border px-3 py-2 rounded-md resize-none h-24"/>
            
            <button type="submit" className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
            Update
            </button>
        </form>
    </div>
  );
}
