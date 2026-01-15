"use client";
import movies from "../../../data/movies.json";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

export default function MoviesPage() {

  return (
    <div className="">
      <section className="bg-gray-100 py-10">
            <h2 className="mx-10 mb-10 text-2xl font-extrabold text-black text-center">NOW SHOWING</h2>

            <div className="mb-5 flex flex-wrap justify-center">

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation = {false}
                autoplay={{ delay: 3000 }}
                slidesOffsetBefore={100}
                slidesPerView={4}
                spaceBetween={5}
                >
                
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id} className="overflow-visible">
                    <Link href={`/movies/${movie.id}`} key={movie.id}>
                    <div key={movie.id} className="rounded-lg w-50 hover:scale-105 transition-transform">
                        <img src={movie.img} alt={movie.title} className="rounded-2xl mb-3 w-full h-80 object-cover" />
                        <h3 className="text-black font-semibold text-lg">{movie.title}</h3>
                        
                    </div>
                    </Link>
                    </SwiperSlide>
                ))}
                    
                </Swiper>
            </div>
        </section>


        {/* CLOSER DIV */}
    </div> 
  );
}
