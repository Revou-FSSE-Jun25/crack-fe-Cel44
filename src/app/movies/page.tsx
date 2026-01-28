"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react'
import { getMovies } from "../lib/api";
import Skeleton from "react-loading-skeleton";

export default function MoviesPage() {

    const router = useRouter();
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "USER") {
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

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    const isSearching = search.trim().length > 0;

    if (loading) return <p>Loading movies...</p>;

    return (
    // ------------------- JUDUL HALAMAN -------------------
        <div className="h-screen mb-20 py-10 bg-gray-100">
            <h2 className="text-2xl font-extrabold text-black text-center mb-10">
                NOW SHOWING
            </h2>
        
    {/* ------------------- APABILA LOADING SAAT FETCH MOVIES -------------------*/}
            {loading && (
                <div className="flex justify-center gap-6 px-4 flex-wrap">
                {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-40">
                    <Skeleton height={320} borderRadius={8} />
                    <Skeleton height={20} className="mt-2" />
                    </div>
                ))}
                </div>
            )}

    {/* ------------------- SEARCH BAR -------------------*/}

            <input
                type="text"
                placeholder="Search movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-15 ml-8 w-full max-w-md px-4 py-2 border rounded-lg"
            />

    {/* ------------------- MOVIES YANG DI SUDAH DIFILTER -------------------*/}

            {isSearching && (
                <>
                    {filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
                        {filteredMovies.map((movie) => (
            
                            //----------------- PENGATURAN UNTUK MOVIE YANG DISEARCH

                            <Link key={movie.id} href={`/movies/${movie.id}`}>
                                <div className="flex flex-col items-center hover:scale-105 transition-transform">
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                    className="w-64 h-auto object-cover rounded-xl mb-2"
                                />
                                <h3 className="text-black font-semibold text-lg text-center">
                                    {movie.title}
                                </h3>
                                </div>
                            </Link>

                            //----------------- PENGATURAN UNTUK MOVIE YANG DISEARCH (END)

                        ))}
                    </div>
                            //----------------- JIKA MOVIE TIDAK DITEMUKAN

                    ) : ( 
                    <p className="text-center text-gray-500 mt-10">
                        No movies found
                    </p>
                    )}
                </>
            )}

    {/* ------------------- DEFAULT VIEW -------------------*/}
    {/* ------------------- LIST MOVIES SEBELUM DI SEARCH -------------------*/}

                
            {!loading && !isSearching && movies.length > 0 && (
            <div className="flex justify-center px-4">
                <Swiper
                modules={[Navigation, Autoplay]}
                navigation={false}
                autoplay={{ delay: 3000 }}
                spaceBetween={20}
                centeredSlides={false}
                breakpoints={{
                    0: {slidesPerView: 1,},
                    640: {slidesPerView: 2,},
                    768: {slidesPerView: 3,},
                    1024: {slidesPerView: 4,},
                }}
                className="w-full max-w-7xl"
                >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
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
            )}

        </div>
      );
      
}