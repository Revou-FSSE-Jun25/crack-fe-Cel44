"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react'
import { getMovies } from "../lib/api";

export default function MoviesPage() {

    const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      router.push("/login");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchMovies() {
      try {
        const data = await getMovies();
        setMovies(data); // hanya movie dari database
      } catch (err) {
        console.error(err);
        alert("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [router]);

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="py-10 bg-gray-100">
        <h2 className="text-2xl font-extrabold text-black text-center mb-10">
            NOW SHOWING
        </h2>

        <div className="flex justify-center">
            <Swiper
            modules={[Navigation, Autoplay]}
            navigation={false}
            autoplay={{ delay: 3000 }}
            slidesPerView={3}
            spaceBetween={20}
            >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id} className="overflow-visible">
                <Link href={`/movies/${movie.id}`}>
                    <div className="flex flex-col items-center rounded-lg hover:scale-105 transition-transform">
                    <img
                        src={movie.img}
                        alt={movie.title}
                        className="rounded-xl mb-2 w-64 h-auto object-cover"
                    />
                    <h3 className="text-black font-semibold text-lg text-center">
                        {movie.title}
                    </h3>
                    </div>
                </Link>
                </SwiperSlide>
            ))}
            </Swiper>

        </div>
    </div>
    );
}